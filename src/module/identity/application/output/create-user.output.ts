import { User } from '@identity/domain/entity/user';

type UserOutput = {
	UserGuid: string;
	FirstName: string;
	LastName: string;
	EmailAddress: string;
	Role: string;
};

export class CreateUserOutput {
	static toOutput(user: User): UserOutput {
		return {
			UserGuid: user.getUserGuid().getGuid(),
			FirstName: user.getFullName().getFirstName(),
			LastName: user.getFullName().getLastName(),
			EmailAddress: user.getEmailAddress(),
			Role: user.getRole().value,
		};
	}
}
