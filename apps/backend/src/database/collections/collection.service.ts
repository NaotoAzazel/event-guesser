import { Inject, Injectable, Type } from '@nestjs/common';
import { DATA_SOURCE } from '../../shared/constants/app.constants';
import {
  DataSource,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  InsertResult,
  ObjectLiteral,
  Repository,
} from 'typeorm';

@Injectable()
export abstract class CollectionService<T extends ObjectLiteral> {
  abstract getRepositoryEntityTarget(): Type<T>;

  protected readonly entityRepository: Repository<T>;

  constructor(
    @Inject(DATA_SOURCE) private readonly databaseProviders: DataSource,
  ) {
    this.entityRepository = this.databaseProviders.getRepository(
      this.getRepositoryEntityTarget(),
    );
  }

  count(options?: FindManyOptions<T>) {
    return this.entityRepository
      .count(options)
      .then((result) => result)
      .catch(() => false);
  }

  insert(dto: T | T[]): Promise<InsertResult | false> {
    return this.entityRepository
      .insert(dto)
      .then((result) => result)
      .catch(() => false);
  }

  save(dto: T): Promise<false | T> {
    return this.entityRepository
      .save(dto)
      .then((result) => result)
      .catch(() => false);
  }

  update(id: number, dto: Partial<T>): Promise<boolean> {
    return this.entityRepository
      .update(id, dto)
      .then(() => true)
      .catch(() => false);
  }

  delete(id: number): Promise<boolean> {
    return this.entityRepository
      .delete(id)
      .then(() => true)
      .catch(() => false);
  }

  findOne(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T | null> {
    return this.entityRepository.findOne({ where, relations: relations ?? {} });
  }

  findManyByOptions(
    where: Partial<FindOptionsWhere<T>>,
    page: number = 1,
    take: number = Number.POSITIVE_INFINITY,
  ): Promise<T[]> {
    return this.entityRepository.find({ where, skip: (page - 1) * take, take });
  }
}
