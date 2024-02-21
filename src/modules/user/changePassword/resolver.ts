import { AuthenticationError } from 'apollo-server-express';
import { UserModel } from 'entities';
import { Resolvers } from 'generated/graphql';

import { comparePasswords, generateHashedPassword } from '../utils';

export const resolvers: Resolvers = {
  Mutation: {
    changePassword: async (_, { changePasswordInput: { currentPassword, password, confirmPassword } }, { loggedInUserId }) => {
      if (!loggedInUserId) {
        return new AuthenticationError('User is not authenticated');
      }

      if (currentPassword === password) {
        return {
          __typename: 'Error',
          message: 'New password cannot be same as old password',
        };
      }

      const user = await UserModel.findById(loggedInUserId).select('+password');

      const isEqual = await comparePasswords(currentPassword, user.password);

      if (!user || !user.isVerified || !isEqual) {
        return {
          __typename: 'Error',
          message: 'Invalid credentials.',
        };
      }

      if (password !== confirmPassword) {
        return {
          __typename: 'Error',
          message: 'Confirm password must be same as password',
        };
      }

      const hashedPassword = await generateHashedPassword(password);

      const updatedUser = await UserModel.findByIdAndUpdate(
        loggedInUserId,
        {
          $set: { password: hashedPassword },
        },
        { new: true, runValidators: true },
      );

      if (updatedUser && updatedUser._id) {
        return { __typename: 'Success', success: true };
      }

      return {
        __typename: 'Error',
        message: 'Failed to change password',
      };
    },
  },
};
