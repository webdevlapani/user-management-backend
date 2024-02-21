import { AuthenticationError } from 'apollo-server-express';
import { UserModel } from 'entities';
import { ModuleType, PermissionType, Resolvers } from 'generated/graphql';
import { getPermissions } from 'utils';

import { createConfirmationUrl, generateHashedPassword, sendEmail } from '../utils';

export const resolvers: Resolvers = {
  Mutation: {
    registerUser: async (_, { registerUserInput: { email, firstName, lastName, password } }, { loggedInUserId }) => {
      const hashedPassword = await generateHashedPassword(password);

      if (!loggedInUserId) {
        return new AuthenticationError('User is not authenticated');
      }

      const hasPermission = await getPermissions({ userId: loggedInUserId, moduleType: ModuleType.USERS, permissionType: PermissionType.READ });

      if (!hasPermission) {
        return { __typename: 'Error', message: 'Permission denied' };
      }

      const userAlreadyExists = await UserModel.findOne({ email });

      if (userAlreadyExists) {
        return {
          __typename: 'Error',
          message: 'Email already taken.',
        };
      }

      const user = await UserModel.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      const url = await createConfirmationUrl(user._id.toString());

      await sendEmail({
        to: email,
        subject: 'Account Verification',
        text: `Click on the link to verify your account. ${url}`,
      });

      return { __typename: 'Success', success: true };
    },
  },
};
