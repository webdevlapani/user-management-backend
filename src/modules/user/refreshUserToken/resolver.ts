import { AuthenticationError } from 'apollo-server-express';
import { UserModel } from 'entities';
import { Resolvers } from 'generated/graphql';
import { decode, JwtPayload, verify } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { generateToken } from 'utils';

export const resolvers: Resolvers = {
  Query: {
    refreshUserToken: async (_, { userId, refreshToken }) => {
      const user = await UserModel.findById(userId);

      if (!decode(refreshToken) || !user || !user.isVerified) {
        throw new AuthenticationError('Invalid/Expired Token.');
      }

      const decodedToken = verify(refreshToken, process.env.SECRET_KEY!);

      if (!new Types.ObjectId(userId).equals((decodedToken as JwtPayload).userId && (decodedToken as JwtPayload).isRefreshToken)) {
        throw Error('Refresh token verification failed');
      }

      const accessToken = generateToken({ userId });

      return { accessToken };
    },
  },
};
