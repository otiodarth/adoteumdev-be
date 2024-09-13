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

	validate(): void {
		if (!this.email) {
			throw new IdentityDomainException('User e-mail is required');
		}

		if (!this.role) {
			throw new IdentityDomainException('User role is required');
		}
	}
}
