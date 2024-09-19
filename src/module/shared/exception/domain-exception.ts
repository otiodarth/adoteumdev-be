import { HttpException, HttpStatus } from '@nestjs/common';

export class DomainException extends HttpException {
	constructor(aMessage: string) {
		super(aMessage, HttpStatus.UNPROCESSABLE_ENTITY);
		this.message = aMessage;
		this.name = 'DomainException';
	}
}
