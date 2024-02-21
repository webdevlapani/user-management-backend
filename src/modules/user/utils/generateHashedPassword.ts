import bcrypt from 'bcryptjs';

export const generateHashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(+process.env.SALT!);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};
