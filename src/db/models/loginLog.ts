import { DataTypes, Optional } from 'sequelize';
import sequelize from './sequelize';
import BaseModel from './baseModel';

interface ILoginLogAttributes {
  id: number;
  userId: number;
}

interface ILoginLogCreationAttributes
  extends Optional<ILoginLogAttributes, 'id'> {}

export default class LoginLog
  extends BaseModel<ILoginLogAttributes, ILoginLogCreationAttributes>
  implements ILoginLogAttributes {
  public id!: number;

  public userId!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

LoginLog.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    tableName: 'login_logs',
    sequelize,
    underscored: true,
  },
);
