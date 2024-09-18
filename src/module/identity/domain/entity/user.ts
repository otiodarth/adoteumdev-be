import { FullName, Identifier, UserRole } from '../value-object';

import { IdentityDomainException } from '../exception/identity-domain.exception';

export class User {
	private id: Identifier;
	private fullName: FullName;
	private email: string;
	private role: UserRole;
	private password: string;

	constructor(
		id: Identifier,
		fullName: FullName,
		email: string,
		role: UserRole,
		password: string,
	) {
		this.id = id;
		this.fullName = fullName;
		this.email = email;
		this.role = role;
		this.password = password;
		this.validate();
	}

	getId(): Identifier {
		return this.id;
	}

	getFullName(): FullName {
		return this.fullName;
	}

	getEmail(): string {
		return this.email;
	}

	getRole(): UserRole {
		return this.role;
	}

	getPassword(): string {
		return this.password;
	}

	changeRole(newRole: UserRole): void {
		this.role = newRole;
	}

	changePassword(aPassword: string): void {
		this.password = aPassword;
		this.validatePassword(aPassword);
	}

	validate(): void {
		if (!this.email) {
			throw new IdentityDomainException('User e-mail is required');
		}

		if (!this.role) {
			throw new IdentityDomainException('User role is required');
		}

		const isPasswordValid = this.validatePassword(this.password);
		if (!isPasswordValid) {
			throw new IdentityDomainException('Password must be strong');
		}

		const isEmailValid = this.validateEmail(this.email);
		if (!isEmailValid) {
			throw new IdentityDomainException('Must be a valid e-mail address');
		}
	}

	validatePassword(plainText: string): boolean {
		const passwordRegex =
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
		return passwordRegex.test(plainText);
	}

	validateEmail(emailAddress: string): boolean {
		const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
		return emailRegex.test(emailAddress);
	}
}
