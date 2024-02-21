import { s3 } from 'lib';

import { SIGNED_URL_EXPIRATION_TIME } from '../constants';

type Params = {
  bucketName: string;
  key: string;
};

export const generatePresignedUrl = ({ bucketName, key }: Params) => {
  return s3.getSignedUrl('getObject', {
    Bucket: bucketName,
    Key: key,
    Expires: SIGNED_URL_EXPIRATION_TIME,
  });
};
