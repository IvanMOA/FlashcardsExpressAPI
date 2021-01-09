import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import sequelize from "../database/database";

interface ItemCreationAttributes extends Optional<IItem, "id"> {}

class Item extends Model<IItem, ItemCreationAttributes> implements IItem {
  id!: number;
  name!: string;
  description!: string;
  stock!: number;
  price!: number;
  image!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: "Item" }
);

Item.sync();

export default Item;
