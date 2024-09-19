import { CreateUserInput } from '@identity/application/input/create-user.input';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDbMemory } from '@persistence/typeorm/config/typeorm-config-db-memory';
import * as request from 'supertest';
import { AppModule } from '../../../../../app.module';

describe('UserManagementController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule, TypeOrmModule.forRoot(configDbMemory)],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/users (POST)', async () => {
		const validUserData: CreateUserInput = {
			FirstName: 'John',
			LastName: 'Doe',
			EmailAddress: 'john@example.com',
			Role: 'mentee',
			Password: 'Str0ngP@ssw0rd!',
			PasswordConfirmation: 'Str0ngP@ssw0rd!',
		};

		const response = await request(app.getHttpServer())
			.post('/users')
			.send(validUserData)
			.expect(201);

		expect(response.body).toHaveProperty('UserGuid');
	});

	afterEach(async () => {
		await app.close();
	});
});
