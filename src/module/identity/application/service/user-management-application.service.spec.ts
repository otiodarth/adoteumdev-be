import { FullName, Identifier, UserRole } from '@identity/domain/value-object';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserInput } from '../input/create-user.input';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserManagementApplicationService } from './user-management-application.service';
import { UserManagementRepository } from '@persistence/typeorm/repository/user-management.repository';
import { configDbMemory } from '@persistence/typeorm/config/typeorm-config-db-memory';

const validUserData: CreateUserInput = {
	firstName: 'John',
	lastName: 'Doe',
	email: 'john@example.com',
	role: new UserRole('mentee'),
};

describe('UserManagementApplicationService', () => {
	let service: UserManagementApplicationService;
	let repository: UserManagementRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [TypeOrmModule.forRoot(configDbMemory)],
			providers: [
				UserManagementApplicationService,
				{
					provide: UserManagementRepository,
					useValue: {
						create: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<UserManagementApplicationService>(
			UserManagementApplicationService,
		);
		repository = module.get<UserManagementRepository>(UserManagementRepository);
	});

	it('should create a new user and with correct values', async () => {
		const createdUser = await service.createUser(validUserData);

		expect(repository.create).toHaveBeenCalledWith({
			id: expect.any(Identifier),
			fullName: new FullName(validUserData.firstName, validUserData.lastName),
			email: validUserData.email,
			role: validUserData.role,
		});

		expect(createdUser.getId().getId()).toBeTruthy();
		expect(createdUser.getFullName()).toEqual(
			new FullName(validUserData.firstName, validUserData.lastName),
		);
		expect(createdUser.getEmail()).toBe(validUserData.email);
		expect(createdUser.getRole()).toEqual(validUserData.role);
	});
});
