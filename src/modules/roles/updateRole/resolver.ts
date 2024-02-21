import { AuthenticationError } from 'apollo-server-express';
import { Permission, RoleModel } from 'entities';
import { ModuleType, PermissionType, Resolvers } from 'generated/graphql';
import { getPermissions } from 'utils';

type RoleData = {
  name?: string;
  permissions?: Permission[];
};

export const resolvers: Resolvers = {
  Mutation: {
    updateRole: async (_, { updateRoleInput: { roleId, name, permissions } }, { loggedInUserId }) => {
      if (!loggedInUserId) {
        return new AuthenticationError('User is not authenticated');
      }

      const role = await RoleModel.findById(roleId);

      if (!role) {
        return { __typename: 'Error', message: 'Role not found' };
      }

      const roleData: RoleData = {};

      if (name) {
        roleData.name = name;
      }

      if (permissions?.length) {
        roleData.permissions = permissions;
      }

      const hasPermission = await getPermissions({ userId: loggedInUserId, moduleType: ModuleType.ROLES, permissionType: PermissionType.UPDATE });

      if (hasPermission) {
        const role = await RoleModel.findByIdAndUpdate(
          roleId,
          {
            $set: roleData,
          },
          { new: true, runValidators: true },
        );

        if (role && role._id) {
          return { __typename: 'Success', success: true };
        }
      }

      return { __typename: 'Error', message: 'Permission denied' };
    },
  },
};
