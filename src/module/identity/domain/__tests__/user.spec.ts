import { User } from '../entity/user';
import { UserRole } from '../enum/user-role.enum';
import { IdentityDomainException } from '../exception/identity-domain.exception';
import { Identifier, FullName } from '../value-object';

describe('User unit tests', () => {
	it('should instantiate a new user object successfully', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@example.com',
			role: UserRole.MENTEE,
		};

		const id = new Identifier();
		const fullName = new FullName(userData.firstName, userData.lastName);

		const newUser = new User(id, fullName, userData.email, userData.role);

		expect(newUser.getId()).toBe(id);
		expect(newUser.getFullName().getFirstName()).toBe(userData.firstName);
		expect(newUser.getFullName().getLastName()).toBe(userData.lastName);
		expect(newUser.getFullName().toString()).toBe(
			`${userData.firstName} ${userData.lastName}`,
		);
		expect(newUser.getEmail()).toBe(userData.email);
		expect(newUser.getRole()).toBe(userData.role);
	});

	it('should return an IdentityDomainException if firstname is not provided', () => {
		const userData = {
			lastName: 'Doe',
			email: 'john@example.com',
			role: UserRole.MENTEE,
		};

		expect(() => {
			new FullName(null, userData.lastName);
		}).toThrow(new IdentityDomainException('First name is required'));
	});
});
