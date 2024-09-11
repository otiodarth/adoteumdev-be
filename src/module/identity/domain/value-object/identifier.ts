import { v4 as uuidv4 } from 'uuid';
import { IdentityDomainException } from '../exception/identity-domain.exception';

export class Identifier {
	private readonly id: string;

	constructor(id?: string) {
		if (id) {
			if (!this.isValidUUID(id)) {
				throw new IdentityDomainException('UUID invalid format');
			}
			this.id = id;
		} else {
			this.id = uuidv4();
		}
	}

	getId(): string {
		return this.id;
	}

	private isValidUUID(id: string): boolean {
		const uuidPattern =
			/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
		return uuidPattern.test(id);
	}
}
