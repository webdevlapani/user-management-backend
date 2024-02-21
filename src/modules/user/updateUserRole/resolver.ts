import { AuthenticationError } from 'apollo-server-express';
import { RoleModel, UserModel } from 'entities';
import { ModuleType, PermissionType, Resolvers } from 'generated/graphql';
import { getPermissions } from 'utils';

export const resolvers: Resolvers = {
  Mutation: {
    updateUserRole: async (_, { userId, roleId }, { loggedInUserId }) => {
      if (!loggedInUserId) {
        return new AuthenticationError('User is not authenticated');
      }

      const role = await RoleModel.findById(roleId);

      if (!role) {
        return { __typename: 'Error', message: 'Role not found' };
      }

      const user = await UserModel.findById(userId);

      if (!user) {
        return { __typename: 'Error', message: 'User not found' };
      }

      const hasPermission = await getPermissions({ userId: loggedInUserId, moduleType: ModuleType.ROLES, permissionType: PermissionType.UPDATE });

      if (hasPermission) {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
          $addToSet: {
            roles: roleId,
          },
        });

        if (updatedUser && updatedUser._id) {
          return { __typename: 'Success', success: true };
        }
      }

      return { __typename: 'Error', message: 'Permission denied' };
    },
  },
};
