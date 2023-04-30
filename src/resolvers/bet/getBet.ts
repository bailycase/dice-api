import { GraphQLError } from "graphql";
import { Bet, QueryGetBetArgs } from "../../../resolvers-types";
import { models } from "../../models";

export default async function getBet(
  _: any,
  args: QueryGetBetArgs
): Promise<Bet | null> {
  const bet = await models.bet.findByPk(args.id);

  if (!bet) {
    throw new GraphQLError("No bet found with that id");
  }

  return bet;
}
