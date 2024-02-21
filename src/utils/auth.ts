import { AuthenticationError } from 'apollo-server-errors';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const isAuth = async (req: Request, _res: Response) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.split('Bearer ')[1];

    if (token) {
      try {
        const accessToken = jwt.verify(token, process.env.SECRET_KEY!);

        return accessToken;
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }

    throw new Error("Authentication token must be 'Bearer [token]");
  }

  throw new Error('Authentication header must be provided');
};
