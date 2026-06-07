import { v2 as cloudinary } from "cloudinary";

export const getCloudinary = () => {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      `Cloudinary credentials missing in .env. Please define CLOUDINARY_CLOUD_NAME (or NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME), CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.`
    );
  }

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });

  return cloudinary;
};
