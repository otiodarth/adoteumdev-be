import { FullName, Identifier, UserRole } from '../value-object';

import { User } from '../entity/user';
import { IdentityDomainException } from '../exception/identity-domain.exception';

const validUserData = {
	firstName: 'John',
	lastName: 'Doe',
	email: 'john@example.com',
	role: new UserRole('mentee'),
	password: 'P@ssword10',
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

		expect(newUser.getUserGuid()).toBe(id);
		expect(newUser.getFullName().getFirstName()).toBe(validUserData.firstName);
		expect(newUser.getFullName().getLastName()).toBe(validUserData.lastName);
		expect(newUser.getFullName().toString()).toBe(
			`${validUserData.firstName} ${validUserData.lastName}`,
		);
		expect(newUser.getEmailAddress()).toBe(validUserData.email);
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

	it('should return an IdentityDomainException if lastname has less than 3 characters', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Do',
			email: 'john@example.com',
			role: new UserRole('mentee'),
		};

		expect(() => {
			new FullName(userData.firstName, userData.lastName);
		}).toThrow(
			new IdentityDomainException('Last name should have unless 3 characters'),
		);
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

	it('should return an IdentityDomainException if email is invalid', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'invalidemail.com',
			role: new UserRole('mentee'),
			password: 'P@ssword10',
		};

		const id = new Identifier();
		const fullName = new FullName(userData.firstName, userData.lastName);

		expect(() => {
			new User(id, fullName, userData.email, userData.role, userData.password);
		}).toThrow(new IdentityDomainException('Must be a valid e-mail address'));
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

	it('should return an IdentityDomainException if a weak password is provided', () => {
		const userData = {
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@example.com',
			role: new UserRole('mentee'),
			password: 'weakPassword',
		};

		const id = new Identifier();
		const fullName = new FullName(userData.firstName, userData.lastName);

		expect(() => {
			new User(id, fullName, userData.email, userData.role, userData.password);
		}).toThrow(new IdentityDomainException('Password must be strong'));
	});
});
