import { FullName, Identifier, UserRole } from '@identity/domain/value-object';

import { User } from '@identity/domain/entity/user';
import { IdentityDomainException } from '@identity/domain/exception/identity-domain.exception';
import { EncryptService } from '@identity/domain/service/encrypt-service';
import { Injectable } from '@nestjs/common';
import { UserManagementRepository } from '@persistence/typeorm/repository/user-management.repository';
import { CreateUserInput } from '../input/create-user.input';
import { CreateUserOutput } from '../output/create-user.output';

@Injectable()
export class UserManagementApplicationService {
	constructor(
		private readonly _repository: UserManagementRepository,
		private readonly encryptService: EncryptService,
	) {}

	async createUser(input: CreateUserInput): Promise<CreateUserOutput> {
		const userEmailAlreadyExists = await this._repository.findByEmail(
			input.EmailAddress,
		);

		if (userEmailAlreadyExists) {
			throw new IdentityDomainException('E-mail already exists');
		}

		if (input.Password !== input.PasswordConfirmation) {
			throw new IdentityDomainException(
				'Password and password confirmation do not match',
			);
		}

		const user = new User(
			new Identifier(),
			new FullName(input.FirstName, input.LastName),
			input.EmailAddress,
			new UserRole(input.Role),
			input.Password,
		);

		const hashedPassword = await this.encryptService.encrypt(
			input.Password,
		);
		user.changePassword(hashedPassword);

		const createdUser = await this._repository.create(user);
		return CreateUserOutput.toOutput(createdUser);
	}
}
