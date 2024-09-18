export interface DefaultRepositoryInterface<T> {
	create(entity: T): Promise<T>;
	update(entity: T): Promise<void>;
	find(id: number): Promise<T>;
	findAll(): Promise<T[]>;
}
