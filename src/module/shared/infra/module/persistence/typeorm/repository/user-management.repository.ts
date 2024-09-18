import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserManagementRepositoryInterface } from '../../../../../../identity/persistence/repository/user-management-repository.interface';
import { User } from '../../../../../../identity/domain/entity/user';
import { UserEntity } from '../model/user.entity';
import { UserManagementMapper } from '../mapper/user-management.mapper';

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

	async update(entity: User): Promise<void> {
		const userEntity = UserManagementMapper.toEntity(entity);
		await this.repository.update(entity.getUserGuid().getGuid(), userEntity);
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
}
