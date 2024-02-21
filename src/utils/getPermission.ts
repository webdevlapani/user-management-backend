import { UserModel } from 'entities';
import mongoose from 'mongoose';
import { ModuleType, PermissionType } from 'types';

interface Props {
  userId: string;
  moduleType: ModuleType;
  permissionType: PermissionType;
}

export const getPermissions = async ({ userId, moduleType, permissionType }: Props) => {
  const permissions = await UserModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: 'roles',
        localField: 'roles',
        foreignField: '_id',
        as: 'roles',
      },
    },
    { $unwind: '$roles' },
    { $replaceRoot: { newRoot: '$roles' } },
    { $unwind: '$permissions' },
    { $replaceRoot: { newRoot: '$permissions' } },
    { $match: { $and: [{ moduleType }, { $expr: { $in: [permissionType, '$permissionType'] } }] } },
  ]);

  if (permissions.length) return true;
  return false;
};
