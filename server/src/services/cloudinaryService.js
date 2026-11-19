import cloudinary from '../config/cloudinary.js';

const DEFAULT_FOLDER = 'ecommerce/products';

export const uploadBuffer = (buffer, folder = DEFAULT_FOLDER) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    stream.end(buffer);
  });

export const deleteImage = (publicId) =>
  cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
