export interface Repository<T, CreateDto = Partial<T>, UpdateDto = Partial<T>> {
  create(dto: CreateDto): Promise<T>;
  getById(id: number): Promise<T | null>;
  getAll(): Promise<T[]>;
  remove(id: number): Promise<T>;
  update(id: number, dto: UpdateDto): Promise<T>;
}
