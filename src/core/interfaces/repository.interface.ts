import {
  EntityManager,
  EntityTarget,
  FindManyOptions,
  QueryRunner,
  Repository,
} from 'typeorm';
import { calculatePagination } from '../utils';

interface FindWithPaginationParams {
  page: number;
  limit: number;
}

export interface FindWithPaginationResult<T> {
  totalPages: number;
  total: number;
  data: T[];
  page: number;
  limit: number;
}

export abstract class BaseRepository<T> extends Repository<T> {
  constructor(
    entity: EntityTarget<T>,
    manager: EntityManager,
    queryRunner?: QueryRunner,
  ) {
    super(entity, manager, queryRunner);
  }
  async findWithPagination(
    params: FindManyOptions<T> & FindWithPaginationParams,
  ): Promise<FindWithPaginationResult<T>> {
    const { limit, page } = params;
    const { take, skip } = calculatePagination(limit, page);
    console.log(params);

    const [data, total] = await this.findAndCount({ ...params, skip, take });

    const totalPages = Math.ceil(+total / limit);

    return {
      data,
      totalPages,
      total,
      limit,
      page,
    };
  }
}
