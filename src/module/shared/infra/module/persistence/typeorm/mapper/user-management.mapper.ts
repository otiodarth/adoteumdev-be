import {
	FullName,
	Identifier,
	UserRole,
} from '../../../../../../identity/domain/value-object';

import { User } from '../../../../../../identity/domain/entity/user';
import { UserEntity } from '../model/user.entity';

export class UserManagementMapper {
	static toDomain(entity: UserEntity): User {
		const fullname = new FullName(entity.firstname, entity.lastname);
		const user = new User(
			new Identifier(entity.id),
			fullname,
			entity.email,
			new UserRole(entity.role),
			entity.password,
		);
		return user;
	}

	static toEntity(user: User): UserEntity {
		if (!(user instanceof User)) {
			throw new Error('Expected instance of User');
		}
		const fullName = user.getFullName();
		const userEntity = new UserEntity(
			user.getId().getId(),
			fullName.getFirstName(),
			fullName.getLastName(),
			user.getEmail(),
			user.getRole().value,
		);
		return userEntity;
	}
}
