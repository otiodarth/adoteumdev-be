import {
	FullName,
	Identifier,
	UserRole,
} from '../../../../../../identity/domain/value-object';

import { User } from '../../../../../../identity/domain/entity/user';
import { UserEntity } from '../model/user.entity';

export class UserManagementMapper {
	static toDomain(entity: UserEntity): User {
		const fullname = new FullName(entity.FirstName, entity.LastName);
		const user = new User(
			new Identifier(entity.UserGuid),
			fullname,
			entity.EmailAddress,
			new UserRole(entity.Role),
			entity.Password,
		);
		return user;
	}

	static toEntity(user: User): UserEntity {
		if (!(user instanceof User)) {
			throw new Error('Expected instance of User');
		}
		const fullName = user.getFullName();
		const userEntity = new UserEntity(
			user.getUserGuid().getGuid(),
			fullName.getFirstName(),
			fullName.getLastName(),
			user.getEmailAddress(),
			user.getRole().value,
			user.getPassword(),
		);
		return userEntity;
	}
}
