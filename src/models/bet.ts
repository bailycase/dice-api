import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { getDb } from "../lib/sequelize";

const db = getDb();

class BetModel extends Model<
  InferAttributes<BetModel>,
  InferCreationAttributes<BetModel>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare betAmount: number;
  declare chance: number;
  declare payout: number;
  declare win: boolean;
}

BetModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    betAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    chance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payout: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    win: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    modelName: "bet",
    tableName: "bets",
    sequelize: db,
    indexes: [
      {
        fields: ["userId"],
      },
    ],
  }
);

export default BetModel;
