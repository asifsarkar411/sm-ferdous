import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration is automatically picked up from process.env.CLOUDINARY_URL
// Alternatively, explicitly set them if they are separate env vars:
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file buffer to Cloudinary
 * @param {Buffer} buffer - The file buffer
 * @param {string} folder - Optional folder name in Cloudinary
 * @returns {Promise<string>} - The secure URL of the uploaded image
 */
export async function uploadToCloudinary(buffer, folder = 'portfolio') {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    
    // Write buffer to stream and end it
    uploadStream.end(buffer);
  });
}
