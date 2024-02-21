import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: Schema.Types.ObjectId[];
  isVerified: boolean;
  profilePic: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<User>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    roles: { type: [Schema.Types.ObjectId], ref: 'Role', required: true },
    isVerified: { type: Boolean, default: false },
    profilePic: { type: String, default: 'default-profile.webp' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const UserModel = mongoose.models.User || model<User>('User', schema);
