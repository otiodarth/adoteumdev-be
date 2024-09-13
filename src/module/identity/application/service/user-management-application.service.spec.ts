import { FullName, Identifier, UserRole } from '@identity/domain/value-object';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserInput } from '../input/create-user.input';
import { CreateUserOutput } from '../output/create-user.output';
import { EncryptService } from '@identity/domain/service/encrypt-service';
import { IdentityDomainException } from '@identity/domain/exception/identity-domain.exception';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@identity/domain/entity/user';
import { UserManagementApplicationService } from './user-management-application.service';
import { UserManagementRepository } from '@persistence/typeorm/repository/user-management.repository';
import { configDbMemory } from '@persistence/typeorm/config/typeorm-config-db-memory';

const validUserData: CreateUserInput = {
	firstName: 'John',
	lastName: 'Doe',
	email: 'john@example.com',
	role: 'mentee',
	password: 'plainText',
	passwordConfirmation: 'plainText',
};

describe('UserManagementApplicationService', () => {
	let service: UserManagementApplicationService;
	let repository: UserManagementRepository;
	let encryptService: EncryptService;

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
				{
					provide: EncryptService,
					useValue: {
						encrypt: jest.fn().mockResolvedValue('hashedPassword'),
					},
				},
			],
		}).compile();

		service = module.get<UserManagementApplicationService>(
			UserManagementApplicationService,
		);
		repository = module.get<UserManagementRepository>(UserManagementRepository);
		encryptService = module.get<EncryptService>(EncryptService);
	});

	it('should create a new user and with correct values', async () => {
		const createdUser = new User(
			new Identifier(),
			new FullName(validUserData.firstName, validUserData.lastName),
			validUserData.email,
			new UserRole(validUserData.role),
			'hashedPassword',
		);

		repository.create = jest.fn().mockResolvedValue(createdUser);

		const result = await service.createUser(validUserData);

		expect(encryptService.encrypt).toHaveBeenCalledWith(validUserData.password);
		expect(repository.create).toHaveBeenCalledWith({
			id: expect.any(Identifier),
			fullName: new FullName(validUserData.firstName, validUserData.lastName),
			email: validUserData.email,
			role: new UserRole(validUserData.role),
			password: 'hashedPassword',
		});

		expect(result).toEqual(CreateUserOutput.toOutput(createdUser));
	});

	it('should throw an exception if password and password confirmation do not match', async () => {
		const invalidUserData = {
			...validUserData,
			passwordConfirmation: 'differentPassword',
		};

		await expect(service.createUser(invalidUserData)).rejects.toThrow(
			new IdentityDomainException(
				'Password and password confirmation do not match',
			),
		);
	});
});
