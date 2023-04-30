import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { getDb } from "../lib/sequelize";
import BetModel from "./bet";

const db = getDb();

class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare balance: number;
  // declare bets?: NonAttribute<BetModel[]>; // Note this is optional since it's only populated when explicitly requested in code
  declare bestBet?: NonAttribute<BetModel>; // Note this is optional since it's only populated when explicitly requested in code

  declare static associations: {
    // bets: Association<UserModel, BetModel>;
    bestBet: Association<UserModel, BetModel>;
  };
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    modelName: "user",
    tableName: "users",
    sequelize: db,
  }
);

// UserModel.hasMany(BetModel, {
//   as: "bets",
// });

BetModel.belongsTo(UserModel);

UserModel.hasOne(BetModel, {
  as: "bestBet",
  foreignKey: "userId",
  sourceKey: "id",
});

export default UserModel;
