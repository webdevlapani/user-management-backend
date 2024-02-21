import { AuthenticationError } from 'apollo-server-express';
import { RoleModel } from 'entities';
import { ModuleType, PermissionType, Resolvers } from 'generated/graphql';
import mongoose from 'mongoose';
import { getPermissions } from 'utils';

export const resolvers: Resolvers = {
  Query: {
    getRoles: async (_, { getRolesInput: { skip, limit, filters } }, { loggedInUserId }) => {
      if (!loggedInUserId) {
        return new AuthenticationError('User is not authenticated');
      }

      const hasPermission = await getPermissions({ userId: loggedInUserId, moduleType: ModuleType.ROLES, permissionType: PermissionType.READ });

      if (!hasPermission) {
        return { __typename: 'Error', message: 'Permission denied' };
      }

      const conditions = [];

      if (filters?.name) {
        conditions.push({
          $match: {
            name: {
              $regex: `.*${filters.name}.*`,
              $options: 'i',
            },
          },
        });
      }

      if (filters?.moduleType) {
        conditions.push({
          $match: {
            'permissions.moduleType': filters.moduleType,
          },
        });
      }

      if (filters?.createdBy) {
        conditions.push({
          $match: { createdBy: new mongoose.Types.ObjectId(filters.createdBy) },
        });
      }

      const result = await RoleModel.aggregate([
        ...conditions,
        { $match: { isDelete: false } },
        {
          $facet: {
            roles: [
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
              { $skip: skip ?? 0 },
              { $limit: limit ?? 10 },
            ],
            totalRoles: [
              {
                $count: 'count',
              },
            ],
          },
        },
      ]);

      if (result.length) {
        return { __typename: 'RolesResult', totalRoles: result[0].totalRoles[0]?.count ?? 0, roles: result[0].roles };
      }

      return { __typename: 'RolesResult', ...result[0], totalRoles: result[0].totalRoles[0]?.count ?? 0 };
    },
  },
};
