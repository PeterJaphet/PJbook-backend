import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";
import AWS from "aws-sdk";
import multer from "multer";
import logger from "./logger";

const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export const uploadFileToAws = async (file: any) => {
  const fileName = `${new Date().getTime()}_${file.originalname}`;
  const mimetype = file.mimetype;
  const bucketName = process.env.AWS_S3_BUCKET;
  const params = { 
   // ACL: 'public-read',
    Bucket: bucketName!,
    Key: fileName,
    Body: file.buffer, 
    ContentType: mimetype,
  };

  try {
    const res = await s3.upload(params).promise();
    return res.Location;
  } catch (error) {
    logger.info('Error uploading to S3:', error);
    throw error; 
  }
};

