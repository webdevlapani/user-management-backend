import { AuthenticationError } from 'apollo-server-express';
import { RoleModel } from 'entities';
import { ModuleType, PermissionType, Resolvers, Role } from 'generated/graphql';
import mongoose from 'mongoose';
import { getPermissions } from 'utils';

export const resolvers: Resolvers = {
  Query: {
    getRole: async (_, { roleId }, { loggedInUserId }) => {
      if (!loggedInUserId) {
        return new AuthenticationError('User is not authenticated');
      }

      const hasPermission = await getPermissions({ userId: loggedInUserId, moduleType: ModuleType.ROLES, permissionType: PermissionType.READ });

      if (!hasPermission) {
        return { __typename: 'Error', message: 'Permission denied' };
      }

      const roles: Role[] = await RoleModel.aggregate([
        {
          $match: {
            $and: [{ _id: new mongoose.Types.ObjectId(roleId) }, { isDelete: false }],
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        { $unwind: '$createdBy' },
        {
          $lookup: {
            from: 'roles',
            localField: 'createdBy.roles',
            foreignField: '_id',
            as: 'createdBy.roles',
          },
        },
      ]);

      if (roles.length) {
        return { __typename: 'Role', ...roles[0] };
      }

      return { __typename: 'Error', message: 'Role not found' };
    },
  },
};
