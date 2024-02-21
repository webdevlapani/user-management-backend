import { UserModel } from 'entities';
import { Resolvers } from 'generated/graphql';
import { generateToken } from 'utils';

import { comparePasswords, createConfirmationUrl, sendEmail } from '../utils';

export const resolvers: Resolvers = {
  Query: {
    loginUser: async (_, { loginUserInput: { email, password } }) => {
      const user = await UserModel.findOne({ email }).select('+password');

      if (!user) {
        return {
          __typename: 'Error',
          message: 'Invalid credentials.',
        };
      }

      if (!user.isVerified) {
        const url = await createConfirmationUrl(String(user._id));

        await sendEmail({
          to: email,
          subject: 'Account Verification',
          text: `Click on the link to verify your account. ${url}`,
        });

        return {
          __typename: 'Error',
          message: 'Please verify your account. Check your email for account verification link.',
        };
      }

      const isEqual = await comparePasswords(password, user.password);

      if (!isEqual) {
        return {
          __typename: 'Error',
          message: 'Invalid credentials.',
        };
      }

      const accessToken = generateToken({ userId: user._id });
      const refreshToken = generateToken({ userId: user._id, isRefreshToken: true }, true);

      return {
        __typename: 'Tokens',
        accessToken,
        refreshToken,
      };
    },
  },
};
