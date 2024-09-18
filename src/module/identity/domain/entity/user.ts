import { FullName, Identifier, UserRole } from '../value-object';

import { IdentityDomainException } from '../exception/identity-domain.exception';

export class User {
	private UserGuid: Identifier;
	private FullName: FullName;
	private EmailAddress: string;
	private Role: UserRole;
	private Password: string;

	constructor(
		UserGuid: Identifier,
		FullName: FullName,
		EmailAddress: string,
		Role: UserRole,
		Password: string,
	) {
		this.UserGuid = UserGuid;
		this.FullName = FullName;
		this.EmailAddress = EmailAddress;
		this.Role = Role;
		this.Password = Password;
		this.validate();
	}

	getUserGuid(): Identifier {
		return this.UserGuid;
	}

	getFullName(): FullName {
		return this.FullName;
	}

	getEmailAddress(): string {
		return this.EmailAddress;
	}

	getRole(): UserRole {
		return this.Role;
	}

	getPassword(): string {
		return this.Password;
	}

	changeRole(newRole: UserRole): void {
		this.Role = newRole;
	}

	changePassword(aPassword: string): void {
		this.Password = aPassword;
		this.validatePassword(aPassword);
	}

	validate(): void {
		if (!this.EmailAddress) {
			throw new IdentityDomainException('User e-mail is required');
		}

		if (!this.Role) {
			throw new IdentityDomainException('User role is required');
		}

		const isPasswordValid = this.validatePassword(this.Password);
		if (!isPasswordValid) {
			throw new IdentityDomainException('Password must be strong');
		}

		const isEmailValid = this.validateEmail(this.EmailAddress);
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
