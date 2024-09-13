export class IdentityDomainException extends Error {
	message: string;
	name: string;

	constructor(aMessage: string) {
		super(aMessage);
		this.message = aMessage;
		this.name = 'IdentityDomainException';
	}
}
