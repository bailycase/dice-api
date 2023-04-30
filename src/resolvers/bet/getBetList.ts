import { Bet } from "../../../resolvers-types";
import { models } from "../../models";

export default async function getBetList(_: any): Promise<Bet[] | null> {
  const bets = await models.bet.findAll();

  return bets;
}
