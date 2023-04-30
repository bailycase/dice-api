import { Sequelize } from "sequelize";

let sequelize: Sequelize;

export const getDb = () => {
  if (!sequelize) {
    console.log(process.env);
    sequelize = new Sequelize({
      host: process.env.DB_HOST!,
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      port: parseInt(process.env.DB_PORT!),
      dialect: "postgres",
    });
  }

  return sequelize;
};
