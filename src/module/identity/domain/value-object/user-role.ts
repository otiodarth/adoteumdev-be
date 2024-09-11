import { IdentityDomainException } from '../exception/identity-domain.exception';
import { ValueObject } from './value-object';

export class UserRole extends ValueObject<string> {
	constructor(value: string) {
		if (!UserRole.isValidRole(value)) {
			throw new IdentityDomainException(`User role ${value} is invalid`);
		}
		super(value);
	}

	get value(): string {
		return this._value;
	}

	static isValidRole(role: string): boolean {
		return ['mentee', 'mentor'].includes(role);
	}
}
