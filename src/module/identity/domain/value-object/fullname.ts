import { IdentityDomainException } from '../exception/identity-domain.exception';
import { ValueObject } from './value-object';

export class FullName extends ValueObject<string> {
	private readonly firstName: string;
	private readonly lastName: string;

	constructor(aFirstName: string, aLastName: string) {
		super(`${aFirstName} ${aLastName}`);
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
		return this._value;
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
