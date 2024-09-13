import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IdentityDomainException } from '../../identity/domain/exception/identity-domain.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		let status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		let message = 'Internal server error';
		let exceptionDetails: { name: string; message: string } = {
			name: 'UnknownException',
			message,
		};

		if (exception instanceof IdentityDomainException) {
			message = exception.message;
			status = HttpStatus.BAD_REQUEST;
			exceptionDetails = {
				name: exception.name,
				message: exception.message,
			};
		} else if (exception instanceof HttpException) {
			exceptionDetails = {
				name: exception.name,
				message: exception.message,
			};
		}

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			exception: exceptionDetails,
		});
	}
}
