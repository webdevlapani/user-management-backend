import { AuthenticationError } from 'apollo-server-express';
import { UserModel } from 'entities';
import { ModuleType, PermissionType, Resolvers, User } from 'generated/graphql';
import { generatePresignedUrl, getPermissions } from 'utils';

import { S3_BUCKET_NAME } from '../../../constants';

export const resolvers: Resolvers = {
  Query: {
    getUsers: async (_, { getUsersInput: { skip, limit, filters } }, { loggedInUserId }) => {
      if (!loggedInUserId) {
        return new AuthenticationError('User is not authenticated');
      }

      const hasPermission = await getPermissions({ userId: loggedInUserId, moduleType: ModuleType.USERS, permissionType: PermissionType.READ });

      if (!hasPermission) {
        return { __typename: 'Error', message: 'Permission denied' };
      }

      const conditions = [];

      if (filters?.firstName) {
        conditions.push({
          $match: {
            firstName: {
              $regex: `.*${filters.firstName}.*`,
              $options: 'i',
            },
          },
        });
      }

      if (filters?.lastName) {
        conditions.push({
          $match: {
            lastName: {
              $regex: `.*${filters.lastName}.*`,
              $options: 'i',
            },
          },
        });
      }

      if (filters?.email) {
        conditions.push({
          $match: {
            email: {
              $regex: `.*${filters.email}.*`,
              $options: 'i',
            },
          },
        });
      }

      if (filters?.isActive !== undefined) {
        conditions.push({
          $match: {
            isActive: filters.isActive,
          },
        });
      }

      if (filters?.isVerified !== undefined) {
        conditions.push({
          $match: {
            isVerified: filters.isVerified,
          },
        });
      }

      const result = await UserModel.aggregate([
        ...conditions,
        {
          $facet: {
            users: [
              {
                $lookup: {
                  from: 'roles',
                  localField: 'roles',
                  foreignField: '_id',
                  as: 'roles',
                },
              },
              { $skip: skip ?? 0 },
              { $limit: limit ?? 10 },
            ],
            totalUsers: [
              {
                $count: 'count',
              },
            ],
          },
        },
      ]);

      if (result?.length) {
        const userList = result[0].users.map((user: User) => ({
          ...user,
          profilePic: generatePresignedUrl({ bucketName: S3_BUCKET_NAME, key: user.profilePic! }),
        }));

        return { __typename: 'UserResult', totalUsers: result[0].totalUsers[0]?.count ?? 0, users: userList };
      }

      return { __typename: 'UserResult', ...result[0], totalUsers: result[0].totalUsers[0]?.count ?? 0 };
    },
  },
};
