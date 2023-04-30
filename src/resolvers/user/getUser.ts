import { GraphQLError } from "graphql";
import { QueryGetUserArgs, User } from "../../../resolvers-types";
import { models } from "../../models";

export default async function getUser(
  _: any,
  args: QueryGetUserArgs
): Promise<User | null> {
  const user = await models.user.findByPk(args.id);

  if (!user) {
    throw new GraphQLError("No user found with that id");
  }

  return user;
}
