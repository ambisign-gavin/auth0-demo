import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import ApiError from './errors/apiError';
import errorHandler from './middleware/errorHandler';
import logger from './utilities/logger';
import auth0 from './middleware/auth0';
import UsersRouter from './routers/users';
import Auth0Router from './routers/auth0';
import { NODE_ENV } from './constants/env';

const app = express();

app.use(cors(NODE_ENV === 'development' ? {
  credentials: true,
  allowedHeaders: ['Cookie', 'content-type'],
  origin: 'http://localhost:3001',
} : {}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(auth0);
app.use('/v1', Auth0Router);
app.get('/', (req: Request, res: Response) => {
  logger.info('hello there');
  return res.send('hello world!!');
});
app.use('/v1', UsersRouter);

app.use(
  '/docs/api',
  swaggerUi.serve,
  swaggerUi.setup(YAML.load(path.resolve(__dirname, '../docs/api.yaml'))),
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: ApiError, req: Request, res: Response, _next: NextFunction) => {
  errorHandler(err, req, res);
});

export default app;
