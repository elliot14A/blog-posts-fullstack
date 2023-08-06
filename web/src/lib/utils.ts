import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import AWS from "aws-sdk";

export function cn(...input: ClassValue[]) {
  return twMerge(clsx(...input));
}
export const uploadImage = async (image: FileList) => {
  const endpoint = process.env.NEXT_PUBLIC_S3_ENDPOINT;
  const accessKeyId = process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY;
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  const region = process.env.NEXT_PUBLIC_S3_REGION;
  const s3 = new AWS.S3({
    endpoint,
    accessKeyId,
    region,
    secretAccessKey,
    s3ForcePathStyle: true,
    signatureVersion: "v4",
  });
  const file = image[0];
  const buffer = Buffer.from(await file.arrayBuffer());
  s3.putObject(
    {
      Key: file.name,
      Body: buffer,
      Bucket: bucketName!,
    },
    async (err, _) => {
      if (err) {
        throw new Error(err.message);
      }
    },
  );
  return `${endpoint}/${bucketName}/${file.name}`;
};
