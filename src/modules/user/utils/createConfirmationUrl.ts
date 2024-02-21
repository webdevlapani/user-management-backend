import { redis } from 'lib';
import { generateToken } from 'utils';

import { confirmUserPrefix } from '../../../constants';

export const createConfirmationUrl = async (userId: string) => {
  const token = generateToken({ userId });

  await redis.set(confirmUserPrefix + token, userId, 'ex', 60 * 60 * 24); // 1 Day

  return `${process.env.CLIENT_BASE_URL}/user/confirm/${token}`;
};
