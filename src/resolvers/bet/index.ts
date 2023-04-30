import createBet from "./createBet";
import getBestBetPerUser from "./getBestBetPerUser";
import getBet from "./getBet";
import getBetList from "./getBetList";

export default {
  Query: {
    getBet,
    getBetList,
    getBestBetPerUser,
  },
  Mutation: {
    createBet,
  },
};
