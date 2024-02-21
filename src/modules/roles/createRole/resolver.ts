import { AuthenticationError } from 'apollo-server-express';
import { RoleModel } from 'entities';
import { ModuleType, PermissionType, Resolvers } from 'generated/graphql';
import { getPermissions } from 'utils';

export const resolvers: Resolvers = {
  ModuleType: {
    USERS: ModuleType.USERS,
    ROLES: ModuleType.ROLES,
  },
  PermissionType: {
    CREATE: PermissionType.CREATE,
    READ: PermissionType.READ,
    DELETE: PermissionType.DELETE,
    UPDATE: PermissionType.UPDATE,
  },
  Mutation: {
    createRole: async (_, { createRoleInput: { name, permissions } }, { loggedInUserId }) => {
      if (!loggedInUserId) {
        return new AuthenticationError('User is not authenticated');
      }

      const role = await RoleModel.findOne({ name });

      if (role) {
        return { __typename: 'Error', message: 'Role already exist' };
      }

      const hasPermission = await getPermissions({ userId: loggedInUserId, moduleType: ModuleType.ROLES, permissionType: PermissionType.CREATE });

      if (hasPermission) {
        const role = await RoleModel.create({
          name,
          permissions,
          createdBy: loggedInUserId,
        });

        if (role && role._id) {
          return { __typename: 'Success', success: true };
        }
      }

      return { __typename: 'Error', message: 'Permission denied' };
    },
  },
};
