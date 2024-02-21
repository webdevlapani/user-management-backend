import { AuthenticationError } from 'apollo-server-express';
import { RoleModel } from 'entities';
import { ModuleType, PermissionType, Resolvers } from 'generated/graphql';
import { getPermissions } from 'utils';

export const resolvers: Resolvers = {
  Mutation: {
    deleteRole: async (_, { roleId }, { loggedInUserId }) => {
      if (!loggedInUserId) {
        return new AuthenticationError('User is not authenticated');
      }

      const role = await RoleModel.findById(roleId);

      if (!role) {
        return { __typename: 'Error', message: 'Role not found' };
      }

      const hasPermission = await getPermissions({ userId: loggedInUserId, moduleType: ModuleType.ROLES, permissionType: PermissionType.DELETE });

      if (hasPermission) {
        const role = await RoleModel.findByIdAndUpdate(roleId, {
          $set: {
            isDelete: true,
          },
        });

        if (role && role._id) {
          return { __typename: 'Success', success: true };
        }
      }

      return { __typename: 'Error', message: 'Permission denied' };
    },
  },
};
