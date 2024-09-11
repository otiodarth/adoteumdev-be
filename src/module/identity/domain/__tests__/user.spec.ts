import { User } from '../entity/user';
import { UserRole } from '../value-object/user-role';
import { IdentityDomainException } from '../exception/identity-domain.exception';
import { Identifier, FullName } from '../value-object';

const validUserData = {
	firstName: 'John',
	lastName: 'Doe',
	email: 'john@example.com',
	role: new UserRole('mentee'),
};

describe('User unit tests', () => {
	it('should instantiate a new user object successfully', () => {
		const id = new Identifier();
		const fullName = new FullName(
			validUserData.firstName,
			validUserData.lastName,
		);

		const newUser = new User(
			id,
			fullName,
			validUserData.email,
			validUserData.role,
		);

		expect(newUser.getId()).toBe(id);
		expect(newUser.getFullName().getFirstName()).toBe(validUserData.firstName);
		expect(newUser.getFullName().getLastName()).toBe(validUserData.lastName);
		expect(newUser.getFullName().toString()).toBe(
			`${validUserData.firstName} ${validUserData.lastName}`,
		);
		expect(newUser.getEmail()).toBe(validUserData.email);
		expect(newUser.getRole()).toBe(validUserData.role);
	});

	it('should return an IdentityDomainException if firstname is not provided', () => {
		const userData = {
			lastName: 'Doe',
			email: 'john@example.com',
			role: new UserRole('mentee'),
		};

		expect(() => {
			new FullName(null, userData.lastName);
		}).toThrow(new IdentityDomainException('First name is required'));
	});

	it('should return an IdentityDomainException if lastname is not provided', () => {
		const userData = {
			firstName: 'John',
			email: 'john@example.com',
			role: new UserRole('mentee'),
		};

		expect(() => {
			new FullName(userData.firstName, null);
		}).toThrow(new IdentityDomainException('Last name is required'));
	});

	it('should return an IdentityDomainException if email is not provided', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			role: new UserRole('mentee'),
		};

		const id = new Identifier();
		const fullName = new FullName(userData.firstName, userData.lastName);

		expect(() => {
			new User(id, fullName, null, userData.role);
		}).toThrow(new IdentityDomainException('User e-mail is required'));
	});

	it('should return an IdentityDomainException if user role is not provided', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@example.com',
		};

		const id = new Identifier();
		const fullName = new FullName(userData.firstName, userData.lastName);

		expect(() => {
			new User(id, fullName, userData.email, null);
		}).toThrow(new IdentityDomainException('User role is required'));
	});

	it('should return an IdentityDomainException if user role is invalid', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@example.com',
			role: 'example',
		};

		const id = new Identifier();
		const fullName = new FullName(userData.firstName, userData.lastName);

		expect(() => {
			new User(id, fullName, userData.email, new UserRole(userData.role));
		}).toThrow(
			new IdentityDomainException(`User role ${userData.role} is invalid`),
		);
	});
});
