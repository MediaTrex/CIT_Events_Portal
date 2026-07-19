// backend/controllers/certificateController.js
// Controller for PDF certificate generation and download

import { generateCertificate } from '../services/certificateService.js';

/** Generate certificate for a registration and return its URL */
export const generateCertificateHandler = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const url = await generateCertificate(Number(registrationId));
    res.json({ certificateUrl: url });
  } catch (err) {
    console.error('Generate certificate error:', err);
    res.status(500).json({ error: err.message });
  }
};

/** Download certificate file (served statically, but endpoint provided for convenience) */
export const downloadCertificateHandler = async (req, res) => {
  try {
    const { filename } = req.params;
    // Assuming certificates are stored in public/certificates and served statically
    const filePath = path.resolve('backend', 'public', 'certificates', filename);
    res.download(filePath, err => {
      if (err) {
        console.error('Download error:', err);
        res.status(404).json({ error: 'Certificate not found' });
      }
    });
  } catch (err) {
    console.error('Download certificate error:', err);
    res.status(500).json({ error: err.message });
  }
};
