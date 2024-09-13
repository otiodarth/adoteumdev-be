import { User } from '@identity/domain/entity/user';

type UserOutput = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
};

export class CreateUserOutput {
	static toOutput(user: User): UserOutput {
		return {
			id: user.getId().value,
			firstName: user.getFullName().getFirstName(),
			lastName: user.getFullName().getLastName(),
			email: user.getEmail(),
			role: user.getRole().value,
		};
	}
}
