import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { FileUpload } from 'graphql-upload';
import { s3 } from 'lib';
import { FileType } from 'types';

import { generateBufferFromStream } from './generateBufferFromStream';
import { generateFilename } from './generateFilename';
import { resizeImage } from './resizeImage';

type UploadToS3Params = { file: FileUpload; fileType: FileType; bucketName: string; userId: string };

type UploadToS3Response = Promise<{ filename: string | null; error: string | null }>;

export const uploadToS3 = async ({ file, fileType, bucketName, userId }: UploadToS3Params): UploadToS3Response => {
  const { createReadStream, mimetype } = (await file) as FileUpload;

  if (mimetype.split('/')[0] !== fileType) {
    return {
      filename: null,
      error: `File must be of type ${fileType}`,
    };
  }

  const fileStream = createReadStream();

  const buffer = await generateBufferFromStream(fileStream);

  const image = await resizeImage(buffer);

  const filename = `${generateFilename(userId)}.webp`;

  const params: PutObjectRequest = {
    Bucket: bucketName,
    Key: filename,
    Body: image,
  };

  const data = await s3.upload(params).promise();

  if (data && data.Key) {
    return { filename, error: null };
  } else {
    return { filename: null, error: 'File upload failed' };
  }
};
