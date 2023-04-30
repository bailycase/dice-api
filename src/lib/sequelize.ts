import { Sequelize } from "sequelize";

let sequelize: Sequelize;

export const getDb = () => {
  if (!sequelize) {
    sequelize = new Sequelize(
      "postgres://postgres:password@localhost:5432/dice-api"
    );
  }

  return sequelize;
};
