import { confirmUserPrefix } from 'constants/redisPrefixes';
import { UserModel } from 'entities';
import { Resolvers } from 'generated/graphql';
import { redis } from 'lib';

export const resolvers: Resolvers = {
  Mutation: {
    verifyUser: async (_, { token }) => {
      const userId = await redis.get(confirmUserPrefix + token);

      if (!userId) {
        return { success: false };
      }
      await UserModel.findByIdAndUpdate(userId, {
        $set: {
          isVerified: true,
        },
      });

      return { success: true };
    },
  },
};
