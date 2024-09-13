import { FullName, Identifier } from '../../domain/value-object';

import { CreateUserInput } from '../input/create-user.input';
import { EncryptService } from '@identity/domain/service/encrypt-service';
import { IdentityDomainException } from '@identity/domain/exception/identity-domain.exception';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entity/user';
import { UserManagementRepository } from '../../../shared/infra/module/persistence/typeorm/repository/user-management.repository';

@Injectable()
export class UserManagementApplicationService {
	constructor(
		private readonly _repository: UserManagementRepository,
		private readonly encryptService: EncryptService,
	) {}

	async createUser(input: CreateUserInput): Promise<User> {
		if (input.password !== input.passwordConfirmation) {
			throw new IdentityDomainException(
				'Password and password confirmation do not match',
			);
		}

		const hashedPassword = await this.encryptService.encrypt(input.password);
		const user = new User(
			new Identifier(),
			new FullName(input.firstName, input.lastName),
			input.email,
			input.role,
			hashedPassword,
		);

		await this._repository.create(user);
		return user;
	}
}
