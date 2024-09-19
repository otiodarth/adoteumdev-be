import { FullName, Identifier, UserRole } from '../value-object';

import { User } from '../entity/user';
import { IdentityDomainException } from '../exception/identity-domain.exception';

const validUserData = {
	FirstName: 'John',
	LastName: 'Doe',
	EmailAddress: 'john@example.com',
	Role: new UserRole('mentee'),
	Password: 'P@ssword10',
};

describe('User unit tests', () => {
	it('should instantiate a new user object successfully', () => {
		const guid = new Identifier();
		const fullName = new FullName(
			validUserData.FirstName,
			validUserData.LastName,
		);

		const newUser = new User(
			guid,
			fullName,
			validUserData.EmailAddress,
			validUserData.Role,
			validUserData.Password,
		);

		expect(newUser.getUserGuid()).toBe(guid);
		expect(newUser.getFullName().getFirstName()).toBe(
			validUserData.FirstName,
		);
		expect(newUser.getFullName().getLastName()).toBe(
			validUserData.LastName,
		);
		expect(newUser.getFullName().toString()).toBe(
			`${validUserData.FirstName} ${validUserData.LastName}`,
		);
		expect(newUser.getEmailAddress()).toBe(validUserData.EmailAddress);
		expect(newUser.getRole()).toBe(validUserData.Role);
	});

	it('should return an IdentityDomainException if firstname is not provided', () => {
		expect(() => {
			new User(
				new Identifier(),
				new FullName(null, validUserData.LastName),
				validUserData.EmailAddress,
				validUserData.Role,
				validUserData.Password,
			);
		}).toThrow(new IdentityDomainException('First name is required'));
	});

	it('should return an IdentityDomainException if firstname has less than 3 characters', () => {
		const newUser = {
			...validUserData,
			FirstName: 'Jo',
		};

		expect(() => {
			new User(
				new Identifier(),
				new FullName(newUser.FirstName, newUser.LastName),
				validUserData.EmailAddress,
				validUserData.Role,
				validUserData.Password,
			);
		}).toThrow(
			new IdentityDomainException(
				'First name should have unless 3 characters',
			),
		);
	});

	it('should return an IdentityDomainException if lastname is not provided', () => {
		expect(() => {
			new User(
				new Identifier(),
				new FullName(validUserData.FirstName, null),
				validUserData.EmailAddress,
				validUserData.Role,
				validUserData.Password,
			);
		}).toThrow(new IdentityDomainException('Last name is required'));
	});

	it('should return an IdentityDomainException if lastname has less than 3 characters', () => {
		const newUser = {
			...validUserData,
			LastName: 'Do',
		};

		expect(() => {
			new User(
				new Identifier(),
				new FullName(newUser.FirstName, newUser.LastName),
				newUser.EmailAddress,
				newUser.Role,
				newUser.Password,
			);
		}).toThrow(
			new IdentityDomainException(
				'Last name should have unless 3 characters',
			),
		);
	});

	it('should return an IdentityDomainException if email is not provided', () => {
		expect(() => {
			new User(
				new Identifier(),
				new FullName(validUserData.FirstName, validUserData.LastName),
				null,
				validUserData.Role,
				validUserData.Password,
			);
		}).toThrow(new IdentityDomainException('User e-mail is required'));
	});

	it('should return an IdentityDomainException if email is invalid', () => {
		const newUser = {
			...validUserData,
			EmailAddress: 'invalidemail.com',
		};

		expect(() => {
			new User(
				new Identifier(),
				new FullName(newUser.FirstName, newUser.LastName),
				newUser.EmailAddress,
				newUser.Role,
				newUser.Password,
			);
		}).toThrow(
			new IdentityDomainException('Must be a valid e-mail address'),
		);
	});

	it('should return an IdentityDomainException if user role is not provided', () => {
		expect(() => {
			new User(
				new Identifier(),
				new FullName(validUserData.FirstName, validUserData.LastName),
				validUserData.EmailAddress,
				null,
				validUserData.Password,
			);
		}).toThrow(new IdentityDomainException('User role is required'));
	});

	it('should return an IdentityDomainException if user role is invalid', () => {
		const newUser = {
			...validUserData,
			Role: 'example.com',
		};

		expect(() => {
			new User(
				new Identifier(),
				new FullName(newUser.FirstName, newUser.LastName),
				newUser.EmailAddress,
				new UserRole(newUser.Role),
				newUser.Password,
			);
		}).toThrow(
			new IdentityDomainException(`User role ${newUser.Role} is invalid`),
		);
	});

	it('should return an IdentityDomainException if a weak password is provided', () => {
		const newUser = {
			...validUserData,
			Password: 'weakPassword.com',
		};

		expect(() => {
			new User(
				new Identifier(),
				new FullName(newUser.FirstName, newUser.LastName),
				newUser.EmailAddress,
				newUser.Role,
				newUser.Password,
			);
		}).toThrow(new IdentityDomainException('Password must be strong'));
	});
});
