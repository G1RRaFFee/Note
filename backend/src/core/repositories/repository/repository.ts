export interface Repository<T> {
  getAllWithFields<K extends keyof T>(
    fields: K[],
    sort?: {
      field: keyof T;
      orderBy: 'asc' | 'desc';
    },
  ): Promise<Pick<T, K>[]>;
  getAllPaginated(
    page: number,
    perPage: number,
    sort?: {
      field: keyof T;
      orderBy: 'asc' | 'desc';
    },
  );
  getAll(sort?: { field: keyof T; orderBy: 'asc' | 'desc' }): Promise<T[]>;
  getTotalCounts(): Promise<number>;
  create(createDto): Promise<T>;
  getById(id: number): Promise<T | null>;
  remove(id: number): Promise<void>;
  update(id: number, updateDto): Promise<T>;
}
