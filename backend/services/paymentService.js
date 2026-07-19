// backend/services/paymentService.js
// Service layer for payment handling (MVC)

import { getConnection } from '../config/database.js';
import { processPayment } from './paymentGateway.js';

/**
 * Initiate a payment for a registration.
 * Creates a payment record, calls the payment gateway, and updates the registration status.
 * @param {Object} params
 * @param {number} params.registrationId - ID of the registration to pay for
 * @param {number} params.userId - Payer user ID
 * @param {number} params.amountCents - Amount in cents
 * @param {string} params.currency - Currency code (e.g., 'USD')
 * @returns {Promise<Object>} Payment record with updated registration status
 */
export async function createPayment({ registrationId, userId, amountCents, currency }) {
  const conn = await getConnection();
  try {
    await conn.beginTransaction();

    // Call abstract payment gateway (could be Stripe, PayPal, etc.)
    const gatewayResult = await processPayment({
      registrationId,
      userId,
      amountCents,
      currency,
    });

    const { status: gatewayStatus, providerTransactionId } = gatewayResult;

    // Map gateway status to payments.status values
    let paymentStatus;
    if (gatewayStatus === 'success' || gatewayStatus === 'completed') {
      paymentStatus = 'completed';
    } else if (gatewayStatus === 'failed') {
      paymentStatus = 'failed';
    } else {
      paymentStatus = 'pending';
    }

    // Insert payment record
    const [paymentRes] = await conn.execute(
      `INSERT INTO payments (registration_id, payment_provider, provider_transaction_id, amount_cents, currency, status, processed_at)
       VALUES (?, 'demo', ?, ?, ?, ?, NOW())`,
      [registrationId, providerTransactionId, amountCents, currency, paymentStatus]
    );
    const paymentId = paymentRes.insertId;

    // Update registration status based on payment outcome
    let registrationStatus = 'pending';
    if (paymentStatus === 'completed') {
      registrationStatus = 'confirmed';
    } else if (paymentStatus === 'failed') {
      registrationStatus = 'cancelled';
    }
    await conn.execute(
      `UPDATE registrations SET status = ? WHERE id = ?`,
      [registrationStatus, registrationId]
    );

    await conn.commit();

    // Return the created payment record (basic fields)
    const [paymentRow] = await conn.execute(
      `SELECT * FROM payments WHERE id = ?`,
      [paymentId]
    );
    return paymentRow[0];
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

/**
 * Update payment status (e.g., from webhook callback) and sync registration status.
 * @param {number} paymentId
 * @param {string} newStatus - 'completed' | 'failed' | 'pending'
 */
export async function updatePaymentStatus(paymentId, newStatus) {
  const conn = await getConnection();
  try {
    await conn.beginTransaction();

    // Update payment record
    await conn.execute(
      `UPDATE payments SET status = ?, processed_at = NOW() WHERE id = ?`,
      [newStatus, paymentId]
    );

    // Find associated registration
    const [payRows] = await conn.execute(
      `SELECT registration_id FROM payments WHERE id = ?`,
      [paymentId]
    );
    if (!payRows.length) {
      throw new Error('Payment not found');
    }
    const registrationId = payRows[0].registration_id;

    // Sync registration status
    let regStatus = 'pending';
    if (newStatus === 'completed') regStatus = 'confirmed';
    else if (newStatus === 'failed') regStatus = 'cancelled';
    else regStatus = 'pending';

    await conn.execute(
      `UPDATE registrations SET status = ? WHERE id = ?`,
      [regStatus, registrationId]
    );

    await conn.commit();
    return { paymentId, newStatus, registrationId, registrationStatus: regStatus };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
