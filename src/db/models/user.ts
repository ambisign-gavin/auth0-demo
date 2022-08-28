import {
  DataTypes,
  Optional,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  Association,
  FindOptions,
  Attributes,
} from 'sequelize';
import { always, cond, T } from 'ramda';
import { UserApiErrors } from 'src/errors';
import sequelize from './sequelize';
import BaseModel from './baseModel';
import LoginLog from './loginLog';

type IRegisterSource = 'google' | 'facebook' | 'email';

interface IUserAttributes {
  id: number;
  systemName: string;
  name: string;
  email: string;
  authId: string;
  emailVerified: boolean;
  registerSource: IRegisterSource;
  lastSessionAt: Date | null;
}

interface IUserCreationAttributes
  extends Optional<IUserAttributes, 'id'> {}

export default class User
  extends BaseModel<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes {
  public id!: number;

  /**
   * can not be updated by the user, just for the auth0 API
   */
  public readonly systemName!: string;

  public name!: string;

  public email!: string;

  public authId!: string;

  public emailVerified!: boolean;

  public registerSource!: IRegisterSource;

  public lastSessionAt!: Date | null;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public getLoginLogs!: HasManyGetAssociationsMixin<LoginLog>;

  public createLoginLog!: HasManyCreateAssociationMixin<LoginLog>;

  public loginLogs!: LoginLog[];

  public static associations: {
    loginLogs: Association<User, LoginLog>;
  };

  public static async createIfNotExist(profile: {
    systemName: string, emailVerified: boolean, email: string, name: string, authId: string,
  }): Promise<User> {
    const registerSource = cond<[id: string], IRegisterSource>([
      [(id) => /google/.test(id), always('google')],
      [(id) => /facebook/.test(id), always('facebook')],
      [T, always('email')],
    ])(profile.authId);

    const [user] = await User.findOrCreate({
      where: { authId: profile.authId },
      defaults: { ...profile, registerSource },
    });

    return user;
  }

  public static async findByOidcUser(oidcUser: Record<string, any>, options?: Omit<FindOptions<Attributes<User>>, 'where'>): Promise<User> {
    const user = await User.findOne({
      where: {
        authId: oidcUser.sub,
      },
      ...options,
    });

    if (!user) {
      throw UserApiErrors.userNotFound;
    }

    return user;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    systemName: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    authId: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    emailVerified: {
      type: new DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },
    registerSource: {
      type: new DataTypes.ENUM('google', 'facebook', 'email'),
      allowNull: false,
    },
    lastSessionAt: {
      type: new DataTypes.DATE(),
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    sequelize,
    underscored: true,
  },
);

User.hasMany(LoginLog, {
  foreignKey: 'userId',
  sourceKey: 'id',
  as: 'loginLogs',
  onDelete: 'CASCADE',
});
