import { codegen } from "@graphql-codegen/core";
import { Types } from "@graphql-codegen/plugin-helpers";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import fs from "fs";
import path from "path";
import { schema } from "./schemas";

const start = async () => {
  const outputFile = "../resolvers-types.ts";
  const typeConfig: Types.GenerateOptions = {
    documents: [],
    config: {
      enumValues: {},
    },
    filename: outputFile,
    schema,
    plugins: [
      {
        typescript: {},
      },
    ],
    pluginMap: {
      typescript: typescriptPlugin,
    },
  };

  const output = await codegen(typeConfig);
  fs.writeFileSync(path.join(__dirname, outputFile), output);
  console.log(path.join(__dirname, outputFile));
  console.log("Outputs generated!");
};

start().catch((e) => console.log(e));
