/**
 * Uploads a file buffer to ImgBB
 * @param {Buffer} buffer - The file buffer
 * @returns {Promise<string>} - The secure URL of the uploaded image
 */
export async function uploadToImgBB(buffer) {
  const apiKey = process.env.IMGBB_API_KEY;
  
  if (!apiKey) {
    throw new Error('IMGBB_API_KEY is not defined in environment variables');
  }

  // Convert buffer to base64
  const base64Image = buffer.toString('base64');

  const formData = new FormData();
  formData.append('image', base64Image);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (data.success) {
    return data.data.url;
  } else {
    throw new Error(data.error?.message || 'Failed to upload image to ImgBB');
  }
}
