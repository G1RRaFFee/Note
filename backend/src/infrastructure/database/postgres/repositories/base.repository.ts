import { Injectable } from '@nestjs/common';

import { Repository } from 'src/core/repositories/repository/repository';

@Injectable()
export class PostgresRepository<T> implements Repository<T> {
  getAll(): Promise<T[]> {
    return;
  }

  getAllWithFields<K extends keyof T>(
    fields: K[],
    sort?: { field: keyof T; orderBy: 'asc' | 'desc' },
  ): Promise<Pick<T, K>[]> {
    throw new Error('Method not implemented.');
  }
  getAllPaginated(
    page: number,
    perPage: number,
    sort?: { field: keyof T; orderBy: 'asc' | 'desc' },
  ) {
    throw new Error('Method not implemented.');
  }
  getTotalCounts(): Promise<number> {
    throw new Error('Method not implemented.');
  }
  create(createDto: any): Promise<T> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<T> {
    throw new Error('Method not implemented.');
  }
  remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(id: number, updateDto: any): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
