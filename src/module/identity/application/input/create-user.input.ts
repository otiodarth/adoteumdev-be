import { UserRole } from '../../domain/value-object';

export class CreateUserInput {
	firstName: string;
	lastName: string;
	email: string;
	role: UserRole;
}
