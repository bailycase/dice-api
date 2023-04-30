import Big from "big.js";
import { GraphQLError } from "graphql";
import { Bet, MutationCreateBetArgs } from "../../../resolvers-types";
import { getDb } from "../../lib/sequelize";
import { models } from "../../models";
import BetModel from "../../models/bet";

export default async function createBet(
  _: any,
  args: MutationCreateBetArgs
): Promise<Bet> {
  const { userId } = args;
  const db = getDb();

  let betResult: BetModel;

  try {
    const betAmount = new Big(args.betAmount);
    const chance = new Big(parseFloat(args.chance.toFixed(2)));

    if (betAmount.lt(0)) {
      throw new Error("Bet amount must be positive");
    }

    if (chance.gt(100) || chance.lt(0.01)) {
      throw new Error("Chance must be between 0.01-100");
    }

    betResult = await db.transaction(async (tx) => {
      const user = await models.user.findByPk(userId, { transaction: tx });

      if (!user) {
        throw new Error("No user exists with that id");
      }

      const userBalance = new Big(user.balance);

      if (userBalance.lt(betAmount)) {
        throw new Error("User doesn't have enough balance to place the bet");
      }

      let updatedBalance = userBalance.minus(betAmount);

      const roll = Math.floor(Math.random() * 100);

      let won = false;
      if (chance.gte(roll)) {
        won = true;
      }

      const payoutMultiplier = new Big(100).div(chance);

      let payout = won ? betAmount.mul(payoutMultiplier) : new Big(0);

      if (won) {
        updatedBalance = updatedBalance.add(payout);
      }

      const bet = models.bet.create({
        betAmount: betAmount.toNumber(),
        chance: chance.toNumber(),
        userId: user.id,
        payout: payout.toNumber(),
        win: won,
      });

      await models.user.update(
        {
          balance: updatedBalance.toNumber(),
        },
        {
          where: {
            id: userId,
          },
        }
      );

      return bet;
    });
  } catch (error) {
    throw new GraphQLError(error as string);
  }

  return betResult;
}
