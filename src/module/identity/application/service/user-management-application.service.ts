import { FullName, Identifier, UserRole } from '../../domain/value-object';

import { CreateUserInput } from '../input/create-user.input';
import { CreateUserOutput } from '../output/create-user.output';
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

		const hashedPassword = await this.encryptService.encrypt(input.Password);
		user.changePassword(hashedPassword);

		const createdUser = await this._repository.create(user);
		return CreateUserOutput.toOutput(createdUser);
	}
}
