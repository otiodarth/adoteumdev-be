import { v4 as uuidv4 } from 'uuid';
import { IdentityDomainException } from '../exception/identity-domain.exception';
import { ValueObject } from './value-object';

export class Identifier extends ValueObject<string> {
	constructor(id?: string) {
		const value = id ? id : uuidv4();

		if (!Identifier.isValidUUID(value)) {
			throw new IdentityDomainException('UUID invalid format');
		}
		super(value);
	}

	getGuid(): string {
		return this._value;
	}

	private static isValidUUID(id: string): boolean {
		const uuidPattern =
			/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
		return uuidPattern.test(id);
	}
}
