import { Injectable } from '@nestjs/common';
import { UserManagementRepository } from '../../../shared/infra/module/persistence/typeorm/repository/user-management.repository';
import { User } from '../../domain/entity/user';
import { FullName, Identifier } from '../../domain/value-object';
import { CreateUserInput } from '../input/create-user.input';

@Injectable()
export class UserManagementApplicationService {
	constructor(private readonly _repository: UserManagementRepository) {}

	async createUser(input: CreateUserInput): Promise<User> {
		const user = new User(
			new Identifier(),
			new FullName(input.firstName, input.lastName),
			input.email,
			input.role,
		);

		await this._repository.create(user);
		return user;
	}
}
