import { UserModel } from 'entities';
import { Resolvers } from 'generated/graphql';

import { forgotPasswordUrl, sendEmail } from '../utils';

export const resolvers: Resolvers = {
  Mutation: {
    forgotPassword: async (_, { email }) => {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return {
          __typename: 'Error',
          message: 'User not found.',
        };
      }

      const url = await forgotPasswordUrl(user._id.toString());

      await sendEmail({
        to: email,
        subject: 'Reset Password',
        text: `Click on the link to reset your account. ${url}`,
      });

      return { __typename: 'Success', success: true };
    },
  },
};
