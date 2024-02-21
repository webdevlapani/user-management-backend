import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { connectDb } from './lib';
import { generateSchema } from './utils/';

dotenv.config();

const main = async () => {
  await connectDb();

  const app = express();

  app.use(
    cors({
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true,
    }),
  );

  const schema = generateSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.authorization;

      if (!token) {
        return { loggedInUserId: '' };
      }

      const accessToken = jwt.verify(token, process.env.SECRET_KEY!);

      return { loggedInUserId: (accessToken as JwtPayload).userId };
    },
  });

  await apolloServer.start();

  app.use(graphqlUploadExpress());

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
  });
};

main().catch((err) => {
  console.log(err);
});
