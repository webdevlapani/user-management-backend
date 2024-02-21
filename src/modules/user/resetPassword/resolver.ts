import { forgotPasswordPrefix } from 'constants/redisPrefixes';
import { UserModel } from 'entities';
import { Resolvers } from 'generated/graphql';
import { redis } from 'lib';

import { comparePasswords, generateHashedPassword } from '../utils';

export const resolvers: Resolvers = {
  Mutation: {
    resetPassword: async (_, { resetPasswordInput: { confirmPassword, password, token } }) => {
      const userId = await redis.get(forgotPasswordPrefix + token);

      if (!userId) {
        return { success: false };
      }

      if (password !== confirmPassword) {
        return {
          __typename: 'Error',
          message: 'Confirm password must be same as password',
        };
      }

      const user = await UserModel.findById(userId).select('+password');

      if (!user) {
        return {
          __typename: 'Error',
          message: 'User not found',
        };
      }

      const isEqual = await comparePasswords(password, user.password);

      if (isEqual) {
        return {
          __typename: 'Error',
          message: 'New password cannot be same as old password',
        };
      }

      const hashedPassword = await generateHashedPassword(password);

      await UserModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            password: hashedPassword,
          },
        },
        { runValidators: true, new: true },
      );

      return { __typename: 'Success', success: true };
    },
  },
};
