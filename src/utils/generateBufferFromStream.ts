import { ReadStream } from 'fs';

export const generateBufferFromStream = (fileStream: ReadStream) => {
  const chunks: Uint8Array[] = [];
  return new Promise<Buffer>((resolve, reject) => {
    fileStream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    fileStream.on('error', (err) => reject(err));
    fileStream.on('end', () => resolve(Buffer.concat(chunks)));
  });
};
