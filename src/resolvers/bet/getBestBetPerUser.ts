import { Bet, QueryGetBestBetPerUserArgs } from "../../../resolvers-types";
import { getDb } from "../../lib/sequelize";
import { models } from "../../models";
import BetModel from "../../models/bet";

export default async function getBestBetPerUser(
  _: any,
  args: QueryGetBestBetPerUserArgs
): Promise<Bet[] | null> {
  let { limit } = args;

  if (!limit) limit = 10;

  const db = getDb();

  //   const bestBets = await models.user.findAll({
  //     attributes: [
  //       [db.fn("DISTINCT", db.col("user.id")), "userId"],
  //       [db.fn("MAX", db.col("bestBet.payout")), "payout"],
  //       "bestBet.*",
  //     ],
  //     include: [
  //       {
  //         model: models.bet,
  //         as: "bestBet",
  //         // subQuery: true,
  //         right: true,
  //         where: {
  //           payout: {
  //             [Op.eq]: db.literal(
  //               `(SELECT MAX(payout) FROM bets WHERE "userId" = "user".id)`
  //             ),
  //           },
  //         },
  //       },
  //     ],
  //     group: ["user.id", "bestBet.id"],
  //     limit: limit,
  //     benchmark: true,
  //   });

  // individual "lazy" (non-eager) queries are faster here
  const bets = await models.bet.findAll({
    attributes: [
      [db.fn("DISTINCT", db.col("userId")), "userId"],
      [db.fn("MAX", db.col("payout")), "payout"],
    ],
    group: ["userId"],
    limit: limit,
  });

  const bestBets = (await Promise.all(
    bets.map(async (bet) => {
      return await models.bet.findOne({
        where: {
          userId: bet.get("userId"),
          payout: bet.get("payout"),
        },
      });
    })
  )) as BetModel[];

  return bestBets;
}
