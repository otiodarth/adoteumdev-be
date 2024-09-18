import { FullName, Identifier, UserRole } from '../value-object';

import { IdentityDomainException } from '../exception/identity-domain.exception';
import { User } from '../entity/user';

const validUserData = {
	firstName: 'John',
	lastName: 'Doe',
	email: 'john@example.com',
	role: new UserRole('mentee'),
	password: 'hashedPassword',
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
			validUserData.password,
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

	it('should return an IdentityDomainException if firstname has less than 3 characters', () => {
		const userData = {
			firstName: 'Jo',
			lastName: 'Doe',
			email: 'john@example.com',
			role: new UserRole('mentee'),
		};

		expect(() => {
			new FullName(userData.firstName, userData.lastName);
		}).toThrow(
			new IdentityDomainException('First name should have unless 3 characters'),
		);
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
			password: 'hashedPassword',
		};

		const id = new Identifier();
		const fullName = new FullName(userData.firstName, userData.lastName);

		expect(() => {
			new User(id, fullName, null, userData.role, userData.password);
		}).toThrow(new IdentityDomainException('User e-mail is required'));
	});

	it('should return an IdentityDomainException if user role is not provided', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@example.com',
			password: 'hashedPassword',
		};

		const id = new Identifier();
		const fullName = new FullName(userData.firstName, userData.lastName);

		expect(() => {
			new User(id, fullName, userData.email, null, userData.password);
		}).toThrow(new IdentityDomainException('User role is required'));
	});

	it('should return an IdentityDomainException if user role is invalid', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@example.com',
			role: 'example',
			password: 'hashedPassword',
		};

		const id = new Identifier();
		const fullName = new FullName(userData.firstName, userData.lastName);

		expect(() => {
			new User(
				id,
				fullName,
				userData.email,
				new UserRole(userData.role),
				userData.password,
			);
		}).toThrow(
			new IdentityDomainException(`User role ${userData.role} is invalid`),
		);
	});
});
