import { makeExecutableSchema } from "@graphql-tools/schema";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import express from "express";
import http, { get } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { resolvers } from "./resolvers";
import { schema } from "./schemas";
import { json } from "body-parser";
import cors from "cors";
import { getDb } from "./lib/sequelize";
import "./models";

const server = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  let executableSchema = makeExecutableSchema({
    typeDefs: [schema],
    resolvers: resolvers,
  });

  const db = getDb();

  // db.sync({ force: true });

  const apolloServer = new ApolloServer({
    schema: executableSchema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: [
        "https://studio.apollographql.com",
        "http://localhost:1337/graphql",
      ],
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
