import { makeExecutableSchema } from '@graphql-tools/schema';
import fs from 'fs';
import glob from 'glob';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import path from 'path';

export const generateSchema = () => {
  const pathToModules = path.join(__dirname, '../modules');
  const typeDefs = glob.sync(`${pathToModules}/**/*.graphql`).map((x) => fs.readFileSync(x, { encoding: 'utf8' }));

  const resolvers = glob.sync(`${pathToModules}/**/resolver.?s`).map((resolver) => require(resolver).resolvers);

  const schema = makeExecutableSchema({
    typeDefs: [constraintDirectiveTypeDefs, typeDefs],
    resolvers,
  });

  return constraintDirective()(schema);
};
