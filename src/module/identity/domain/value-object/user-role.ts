import { IdentityDomainException } from '../exception/identity-domain.exception';

export class UserRole {
	static readonly MENTEE = 'MENTEE';
	static readonly MENTOR = 'MENTOR';
	private readonly _value: string;

	constructor(value: string) {
		if (!UserRole.isValidRole(value)) {
			throw new IdentityDomainException(`User role ${value} is invalid`);
		}
		this._value = value;
	}

	get value(): string {
		return this._value;
	}

	static isValidRole(value: string): boolean {
		return value === UserRole.MENTEE || value === UserRole.MENTOR;
	}
}
