export interface DefaultRepositoryInterface<T> {
	create(entity: T): Promise<T>;
	update(guid: string, entity: Partial<T>): Promise<void>;
	find(id: number): Promise<T>;
	findAll(): Promise<T[]>;
	findByGuid(guid: string): Promise<T>;
}
