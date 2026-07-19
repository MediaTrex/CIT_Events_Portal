// backend/services/emailService.js
// Centralized Email Service (MVC)
// Uses nodemailer and HTML templates for various notifications.

import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import util from 'util';

const readFile = util.promisify(fs.readFile);

// Configure transport using environment variables (add to .env)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'user@example.com',
    pass: process.env.EMAIL_PASS || 'password',
  },
});

/**
 * Load an HTML template and replace {{key}} placeholders with provided values.
 * @param {string} templateName - filename without extension.
 * @param {Object} variables - key/value pairs for replacement.
 */
async function renderTemplate(templateName, variables = {}) {
  const templatePath = path.resolve(
    process.cwd(),
    'backend',
    'emailTemplates',
    `${templateName}.html`
  );
  let html = await readFile(templatePath, 'utf8');
  // Simple placeholder replacement {{key}}
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    html = html.replace(placeholder, String(value));
  });
  return html;
}

/** Generic email sender using a template */
async function sendEmail(to, subject, templateName, variables) {
  const html = await renderTemplate(templateName, variables);
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'no-reply@cit-events.com',
    to,
    subject,
    html,
  };
  return transporter.sendMail(mailOptions);
}

// Exported convenience functions for each template
export const sendRegistrationSuccess = (to, variables) =>
  sendEmail(to, 'Registration Successful', 'registrationSuccess', variables);

export const sendPaymentSuccess = (to, variables) =>
  sendEmail(to, 'Payment Successful', 'paymentSuccess', variables);

export const sendTeamInvitation = (to, variables) =>
  sendEmail(to, 'Team Invitation', 'teamInvitation', variables);

export const sendOrganizerApproval = (to, variables) =>
  sendEmail(to, 'Organizer Approval', 'organizerApproval', variables);

export const sendEventReminder = (to, variables) =>
  sendEmail(to, 'Event Reminder', 'eventReminder', variables);

export const sendResultPublished = (to, variables) =>
  sendEmail(to, 'Result Published', 'resultPublished', variables);

export default {
  sendRegistrationSuccess,
  sendPaymentSuccess,
  sendTeamInvitation,
  sendOrganizerApproval,
  sendEventReminder,
  sendResultPublished,
};
