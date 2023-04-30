import { mergeResolvers } from "@graphql-tools/merge";
import { resolvers as scalarResolvers } from "graphql-scalars";
import bet from "./bet";
import user from "./user";

export const resolvers = mergeResolvers([user, bet, scalarResolvers]);
