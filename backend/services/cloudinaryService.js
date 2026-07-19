// services/cloudinaryService.js
// Handles uploading local files to Cloudinary and cleaning up temporary files

import cloudinary from '../config/cloudinary.js';
import fs from 'fs/promises';

/**
 * Upload local file to Cloudinary
 * @param {string} filePath - Path to local file
 * @param {string} folder - Destination folder in Cloudinary
 * @returns {Promise<string>} - Cloudinary secure URL
 */
export async function uploadToCloudinary(filePath, folder = 'cit-events') {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
    });
    
    // Clean up local temp file
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.warn('Failed to delete temp file:', err.message);
    }
    
    return result.secure_url;
  } catch (err) {
    // Cleanup local file in case of upload failure
    try {
      await fs.unlink(filePath);
    } catch (unlinkErr) {
      // ignore
    }
    throw err;
  }
}
