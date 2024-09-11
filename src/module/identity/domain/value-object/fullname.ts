import { IdentityDomainException } from '../exception/identity-domain.exception';

export class FullName {
	private firstName: string;
	private lastName: string;

	constructor(aFirstName: string, aLastName: string) {
		this.firstName = aFirstName;
		this.lastName = aLastName;
		this.validate();
	}

	getFirstName(): string {
		return this.firstName;
	}

	getLastName(): string {
		return this.lastName;
	}

	toString(): string {
		return `${this.firstName} ${this.lastName}`;
	}

	private validate(): void {
		if (!this.firstName) {
			throw new IdentityDomainException('First name is required');
		}
		if (!this.lastName) {
			throw new IdentityDomainException('Last name is required');
		}
	}
}
