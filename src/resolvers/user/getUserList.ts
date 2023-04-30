import { User } from "../../../resolvers-types";
import { models } from "../../models";

export default async function getUserList(_: any, args: null): Promise<User[]> {
  const users = await models.user.findAll();

  return users;
}
