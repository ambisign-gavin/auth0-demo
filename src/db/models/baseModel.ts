/* eslint-disable no-unused-vars */
import {
  Attributes,
  FindAndCountOptions,
  GroupedCountResultItem,
  Model,
  ModelStatic,
} from 'sequelize';
import { Request } from 'express';
import { DefaultApiErrors } from 'src/errors';
import { SetRequired } from 'sequelize/types/utils/set-required';

export default class BaseModel<
  TModelAttributes = any,
  TCreationAttributes = TModelAttributes,
> extends Model<TModelAttributes, TCreationAttributes> {
  public static async findByIdParam<M extends Model>(
    this: ModelStatic<M>,
    req: Request<any, any, any, any>,
    notFoundError = DefaultApiErrors.resourceNotFound,
  ): Promise<M> {
    const { id } = req.params;
    const model = await this.findByPk(Number(id));
    if (!model) {
      throw notFoundError;
    }
    return model as M;
  }

  public static findWithPaginationRequest<M extends Model>(
    this: ModelStatic<M>,
    req: Request<any, any, any, IPaginationReqQuery>,
    options?: Omit<FindAndCountOptions<Attributes<M>>, 'group'>,
  ): Promise<{ rows: M[]; count: number }>;
  public static findWithPaginationRequest<M extends Model>(
    this: ModelStatic<M>,
    req: Request<any, any, any, IPaginationReqQuery>,
    option: SetRequired<FindAndCountOptions<Attributes<M>>, 'group'>,
  ): Promise<{ rows: M[]; count: GroupedCountResultItem[] }>;
  public static findWithPaginationRequest<M extends Model>(
    this: ModelStatic<M>,
    req: Request<any, any, any, IPaginationReqQuery>,
    options?:
    | Omit<FindAndCountOptions<Attributes<M>>, 'group'>
    | SetRequired<FindAndCountOptions<Attributes<M>>, 'group'>,
  ): Promise<
    | { rows: M[]; count: number }
    | { rows: M[]; count: GroupedCountResultItem[] }
    > {
    const { pageIndex = 0, countPerPage = 10 } = req.query;

    return this.findAndCountAll({
      ...options,
      limit: Number(countPerPage),
      offset: Number(pageIndex) * Number(countPerPage),
    });
  }
}
