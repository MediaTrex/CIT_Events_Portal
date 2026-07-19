// backend/services/paymentGateway.js
// Abstract payment gateway – can be swapped for Stripe, PayPal, etc.

/**
 * Process a payment.
 * @param {Object} paymentInfo - contains amountCents, currency, userId, registrationId, etc.
 * @returns {Promise<Object>} result object with status: 'success' | 'failed' | 'pending' and providerTransactionId.
 */
export async function processPayment(paymentInfo) {
  // Placeholder implementation – always returns pending for demo.
  // Replace with actual gateway SDK calls.
  return {
    status: 'pending',
    providerTransactionId: `demo-${Date.now()}`
  };
}
