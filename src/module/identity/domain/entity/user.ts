import { UserRole } from '../enum/user-role.enum';
import { IdentityDomainException } from '../exception/identity-domain.exception';
import { Identifier, FullName } from '../value-object';

export class User {
	private id: Identifier;
	private fullName: FullName;
	private email: string;
	private role: UserRole;

	constructor(
		id: Identifier,
		fullName: FullName,
		email: string,
		role: UserRole,
	) {
		this.id = id;
		this.fullName = fullName;
		this.email = email;
		this.role = role;
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

	validate(): void {
		if (!this.email) {
			throw new IdentityDomainException('User e-mail is required');
		}
	}
}
