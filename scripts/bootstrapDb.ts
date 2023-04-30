import { faker } from "@faker-js/faker";
import { getDb } from "../src/lib/sequelize";
import { models } from "../src/models";

const NUM_USERS = 1000;
const NUM_BETS = NUM_USERS * 5;

const boostrapDb = async () => {
  const db = getDb();
  await db.sync({ force: true, alter: true });

  const users: any[] = [];
  for (let i = 1; i <= NUM_USERS; i++) {
    users.push({
      name: faker.internet.userName(),
      balance: Math.floor(Math.random() * NUM_USERS),
    });
  }

  await models.user.bulkCreate(users);

  console.log(`${NUM_USERS} users created successfully`);

  const bets: any[] = [];
  for (let i = 1; i <= NUM_BETS; i++) {
    const roll = Math.floor(Math.random() * 100);
    const userId = Math.floor(Math.random() * NUM_USERS) + 1;
    const betAmount = Math.floor(Math.random() * 100) + 1;
    const chance = Math.floor(Math.random() * 99) + 1;
    const payout = Math.floor(betAmount * (100 / chance));

    const won = roll >= chance;

    bets.push({
      userId,
      betAmount,
      chance,
      payout: won ? payout : 0,
      win: won,
    });
  }

  await models.bet.bulkCreate(bets);

  console.log(`${NUM_BETS} bets created successfully`);
};

export default boostrapDb;
