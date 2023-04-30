import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import path from 'path';

const files = loadFilesSync(path.join(__dirname, '*.graphql'), {
  ignoreIndex: true,
});

export const schema = mergeTypeDefs([...files, ...scalarTypeDefs]);