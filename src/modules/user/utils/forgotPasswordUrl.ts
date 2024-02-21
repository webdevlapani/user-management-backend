import { forgotPasswordPrefix } from 'constants/redisPrefixes';
import { redis } from 'lib';
import { generateToken } from 'utils';

export const forgotPasswordUrl = async (userId: string) => {
  const token = generateToken({ userId });
  await redis.set(forgotPasswordPrefix + token, userId, 'ex', 60 * 60 * 24); // 1 Day

  return `${process.env.CLIENT_BASE_URL}/user/forgot-password/${token}`;
};
