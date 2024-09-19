import { ApplicationException } from '@shared/exception/application-exception';

export class IdentityApplicationException extends ApplicationException {
	constructor(aMessage: string) {
		super(aMessage);
		this.name = 'IdentityApplicationException';
	}
}
