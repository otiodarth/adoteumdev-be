import { HttpException, HttpStatus } from '@nestjs/common';

export class ApplicationException extends HttpException {
	constructor(aMessage: string) {
		super(aMessage, HttpStatus.BAD_REQUEST);
		this.message = aMessage;
		this.name = 'ApplicationException';
	}
}
