import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';
import { ModuleType, PermissionType } from 'types';

export type Permission = {
  moduleType: ModuleType;
  permissionType: PermissionType[];
};

export type Role = {
  name: string;
  isDelete: boolean;
  createdBy: Schema.Types.ObjectId;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
};

const PermissionSchema = new Schema<Permission>(
  {
    moduleType: { type: Number, enum: ModuleType, required: true },
    permissionType: { type: [Number], enum: PermissionType, required: true },
  },
  { _id: false },
);

const schema = new Schema<Role>(
  {
    name: { type: String, required: true, unique: true },
    isDelete: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    permissions: {
      type: [PermissionSchema],
      required: true,
    },
  },
  { timestamps: true },
);

export const RoleModel = mongoose.models.Role || model<Role>('Role', schema);
