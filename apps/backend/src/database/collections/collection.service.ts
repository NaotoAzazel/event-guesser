import { Inject, Injectable, Type } from '@nestjs/common';
import { DATA_SOURCE } from '../../shared/constants/app.constants';
import {
  DataSource,
  FindOptionsWhere,
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

  insert(dto: T): Promise<boolean> {
    return this.entityRepository
      .insert(dto)
      .then(() => true)
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

  findOne(where: FindOptionsWhere<T>): Promise<T | null> {
    return this.entityRepository.findOne({ where });
  }

  findManyByOptions(
    where: Partial<FindOptionsWhere<T>>,
    page: number = 1,
    take: number = Number.POSITIVE_INFINITY,
  ): Promise<T[]> {
    return this.entityRepository.find({ where, skip: (page - 1) * take, take });
  }
}
