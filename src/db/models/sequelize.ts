import { Sequelize } from 'sequelize';
import { NODE_ENV } from 'src/constants/env';
import config from 'src/db/config/config.json';

type SequelizeConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'mysql';
  timezone: string;
};

const dbConfig: SequelizeConfig = (config as any)[NODE_ENV] as SequelizeConfig;

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig,
);

export default sequelize;
