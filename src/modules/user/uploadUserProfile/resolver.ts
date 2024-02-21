import { AuthenticationError } from 'apollo-server-express';
import { UserModel } from 'entities';
import { Resolvers } from 'generated/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { FileType } from 'types';
import { uploadToS3 } from 'utils/';

import { S3_BUCKET_NAME } from '../../../constants';

export const resolvers: Resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    uploadUserProfile: async (_, { file }, { loggedInUserId }) => {
      if (!loggedInUserId) {
        return new AuthenticationError('User is not authenticated');
      }

      const { filename, error } = await uploadToS3({ file, fileType: FileType.image, bucketName: S3_BUCKET_NAME, userId: loggedInUserId });

      if (filename) {
        const updateUser = await UserModel.findByIdAndUpdate(loggedInUserId, {
          $set: {
            profilePic: filename,
          },
        });

        if (updateUser && updateUser._id) {
          return { __typename: 'Success', success: true };
        }
      }

      return { __typename: 'Error', message: error };
    },
  },
};
