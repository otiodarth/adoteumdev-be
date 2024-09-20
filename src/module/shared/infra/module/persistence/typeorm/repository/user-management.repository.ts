import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { User } from '@identity/domain/entity/user';
import { UserManagementRepositoryInterface } from '@identity/persistence/repository/user-management-repository.interface';
import { UserManagementMapper } from '../mapper/user-management.mapper';
import { UserEntity } from '../model/user.entity';

@Injectable()
export class UserManagementRepository
	implements UserManagementRepositoryInterface
{
	constructor(
		@InjectRepository(UserEntity)
		private readonly repository: Repository<UserEntity>,
	) {}

	async create(entity: User): Promise<User> {
		const userEntity = UserManagementMapper.toEntity(entity);
		const createdUser = await this.repository.save(userEntity);
		return UserManagementMapper.toDomain(createdUser);
	}

	async update(guid: string, entity: Partial<User>): Promise<void> {
		await this.repository.update(guid, entity as DeepPartial<UserEntity>);
	}

	async find(id: number): Promise<User> {
		const user = await this.repository.findOne({ where: { UserId: id } });
		return UserManagementMapper.toDomain(user);
	}

	async findAll(): Promise<User[]> {
		const users = await this.repository.find();
		return users.map((user) => UserManagementMapper.toDomain(user));
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.repository.findOne({
			where: { EmailAddress: email },
		});
		if (!user) {
			return null;
		}
		return UserManagementMapper.toDomain(user);
	}

	async findByGuid(guid: string): Promise<User | null> {
		const user = await this.repository.findOne({
			where: { UserGuid: guid },
		});
		if (!user) {
			return null;
		}
		return UserManagementMapper.toDomain(user);
	}
}
