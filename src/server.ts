import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import bootstrapDb from "../scripts/bootstrapDb";
import { getDb } from "./lib/sequelize";
import "./models";
import { resolvers } from "./resolvers";
import { schema } from "./schemas";

const server = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  let executableSchema = makeExecutableSchema({
    typeDefs: [schema],
    resolvers: resolvers,
  });

  const db = getDb();

  if (process.env.ENVIRONMENT === "testing") {
    bootstrapDb();
  }

  const apolloServer = new ApolloServer({
    schema: executableSchema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["https://studio.apollographql.com"],
    }),
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

server().catch((e) => console.error(e));
