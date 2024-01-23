import { v2 } from "cloudinary";
import imageSize from "image-size";
import logger from "./logger";

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadCloudImage = async (image, folder) => {
  try {
    const match = image.match(/^data:(.*);base64,(.*)$/);
    if (!match) {
      throw new Error("Invalid image format");
    }

    const type = match[1];
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, "base64");

    const size = buffer.length / 1e6;
    if (size > 5) {
      throw new Error("Image size must not be higher than 5MB");
    }

    const dimensions = imageSize(buffer);
    if (!dimensions.type) {
      throw new Error("Failed to detect image type");
    }

    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "jpg",
      "png",
      "jpeg",
    ];
    if (!allowedImageTypes.includes(`${dimensions.type}`)) {
      throw new Error(
        "Invalid image type. Only JPG, PNG, and JPEG images are allowed."
      );
    }

    const result = await v2.uploader.upload(
      `data:${type};base64,${base64Data}`,
      {
        folder: folder,
      }
    );

    return result;
  } catch (error) {
    logger.err(`Error uploading image: ${JSON.stringify(error)}`);
    throw error;
  }
};

export const uploadPdfFile = async (file, folder) => {
  try {
    const result = await v2.uploader.upload(file, {
      // resource_type: "raw",
      folder: folder,
    });

    return result;
  } catch (error) {
    logger.err(`Error uploading image: ${JSON.stringify(error)}`);
    throw error;
  }
};
