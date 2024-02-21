import { AuthenticationError } from 'apollo-server-express';
import { UserModel } from 'entities';
import { ModuleType, PermissionType, Resolvers } from 'generated/graphql';
import { getPermissions } from 'utils';

export const resolvers: Resolvers = {
  Mutation: {
    toggleUserStatus: async (_, { userId }, { loggedInUserId }) => {
      if (!loggedInUserId) {
        return new AuthenticationError('User is not authenticated');
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        return {
          __typename: 'Error',
          message: 'User not found.',
        };
      }

      const hasPermission = await getPermissions({ userId: loggedInUserId, moduleType: ModuleType.USERS, permissionType: PermissionType.DELETE });

      if (!hasPermission) {
        return { __typename: 'Error', message: 'Permission denied' };
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            isActive: !user.isActive,
          },
        },
        { new: true, runValidators: true },
      );

      if (updatedUser && updatedUser._id) {
        return { __typename: 'Success', success: true };
      }

      return { __typename: 'Error', message: 'Something went wrong' };
    },
  },
};
