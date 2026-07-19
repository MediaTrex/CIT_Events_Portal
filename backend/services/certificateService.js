// backend/services/certificateService.js
// Service layer for PDF certificate generation using PDFKit

import { getConnection } from '../config/database.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// Directory where certificates will be stored (relative to project root)
const CERTS_DIR = path.resolve('backend', 'public', 'certificates');
// Ensure the directory exists
if (!fs.existsSync(CERTS_DIR)) {
  fs.mkdirSync(CERTS_DIR, { recursive: true });
}

/**
 * Generate a PDF certificate for a given registration.
 * @param {number} registrationId - ID of the registration.
 * @returns {Promise<string>} - URL path to the stored certificate.
 */
export async function generateCertificate(registrationId) {
  const conn = await getConnection();
  try {
    // Fetch registration, student, and event details
    const [[reg]] = await conn.execute(
      `SELECT r.id, r.student_id, r.event_id, s.first_name, s.last_name, e.title AS event_title, e.start_date
       FROM registrations r
       JOIN students s ON r.student_id = s.user_id
       JOIN events e ON r.event_id = e.id
       WHERE r.id = ?`,
      [registrationId]
    );
    if (!reg) {
      throw new Error('Registration not found');
    }
    const participantName = `${reg.first_name} ${reg.last_name}`;
    const eventTitle = reg.event_title;
    const eventDate = new Date(reg.start_date).toDateString();

    // Prepare PDF document
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const filename = `certificate_${registrationId}_${Date.now()}.pdf`;
    const filePath = path.join(CERTS_DIR, filename);
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Simple certificate layout (can be enhanced with graphics)
    doc
      .fontSize(30)
      .text('Certificate of Achievement', { align: 'center' })
      .moveDown(2);
    doc
      .fontSize(20)
      .text(`This certifies that`, { align: 'center' })
      .moveDown(1);
    doc
      .fontSize(26)
      .text(participantName, { align: 'center', underline: true })
      .moveDown(1);
    doc
      .fontSize(20)
      .text(`has successfully participated in`, { align: 'center' })
      .moveDown(1);
    doc
      .fontSize(24)
      .text(eventTitle, { align: 'center', italic: true })
      .moveDown(1);
    doc
      .fontSize(16)
      .text(`Date: ${eventDate}`, { align: 'center' })
      .moveDown(3);
    doc
      .fontSize(14)
      .text('Organizer Signature: ______________________', { align: 'right' });

    doc.end();

    // Wait for file to be fully written
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    // Store URL (relative to server static path)
    const urlPath = `/certificates/${filename}`;

    // Insert record into certificates table
    await conn.execute(
      `INSERT INTO certificates (registration_id, issue_date, certificate_url)
       VALUES (?, CURDATE(), ?)`,
      [registrationId, urlPath]
    );

    return urlPath;
  } finally {
    conn.release();
  }
}
