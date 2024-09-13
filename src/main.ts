import { AppModule } from './app.module';
import { GlobalExceptionFilter } from '@shared/exception/global-exception.filter';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api/v1');

	app.useGlobalFilters(new GlobalExceptionFilter());
	await app.listen(3000);
}
bootstrap();
