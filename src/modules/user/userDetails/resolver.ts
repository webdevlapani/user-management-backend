import { AuthenticationError } from 'apollo-server-express';
import { UserModel } from 'entities';
import { Resolvers, User } from 'generated/graphql';
import { generatePresignedUrl } from 'utils';

import { S3_BUCKET_NAME } from '../../../constants';

export const resolvers: Resolvers = {
  Query: {
    userDetails: async (_, { userId }, { loggedInUserId }) => {
      if (!loggedInUserId) {
        return new AuthenticationError('User is not authenticated');
      }

      const user: any = await UserModel.findById(userId ?? loggedInUserId).populate('roles');

      if (user && user.profilePic) {
        const presignedUrl = generatePresignedUrl({ bucketName: S3_BUCKET_NAME, key: user.profilePic });

        const userData: User = { ...user._doc, profilePic: presignedUrl };

        return { __typename: 'User', ...userData };
      }

      return { __typename: 'Error', message: 'test' };
    },
  },
};
