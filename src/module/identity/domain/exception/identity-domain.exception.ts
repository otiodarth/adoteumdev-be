import { DomainException } from '@shared/exception/domain-exception';

export class IdentityDomainException extends DomainException {
	constructor(aMessage: string) {
		super(aMessage);
		this.name = 'IdentityDomainException';
	}
}
