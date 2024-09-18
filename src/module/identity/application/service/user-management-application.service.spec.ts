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
	FirstName: 'John',
	LastName: 'Doe',
	EmailAddress: 'john@example.com',
	Role: 'mentee',
	Password: 'Str0ngP@ssw0rd!',
	PasswordConfirmation: 'Str0ngP@ssw0rd!',
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
						findByEmail: jest.fn(),
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

	it('should create a new user with correct values', async () => {
		const createdUser = new User(
			new Identifier(),
			new FullName(validUserData.FirstName, validUserData.LastName),
			validUserData.EmailAddress,
			new UserRole(validUserData.Role),
			validUserData.Password,
		);

		repository.create = jest.fn().mockResolvedValue(createdUser);
		encryptService.encrypt = jest
			.fn()
			.mockResolvedValue(validUserData.Password);

		const result = await service.createUser(validUserData);

		expect(encryptService.encrypt).toHaveBeenCalledWith(validUserData.Password);
		expect(repository.create).toHaveBeenCalledWith({
			UserGuid: expect.any(Identifier),
			FullName: new FullName(validUserData.FirstName, validUserData.LastName),
			EmailAddress: validUserData.EmailAddress,
			Role: new UserRole(validUserData.Role),
			Password: validUserData.Password,
		});
		expect(result).toEqual(CreateUserOutput.toOutput(createdUser));
	});

	it('should throw an exception if password and password confirmation do not match', async () => {
		const invalidUserData = {
			...validUserData,
			PasswordConfirmation: 'differentPassword',
		};

		await expect(service.createUser(invalidUserData)).rejects.toThrow(
			new IdentityDomainException(
				'Password and password confirmation do not match',
			),
		);
	});

	it('should throw an exception if user email already exists', async () => {
		repository.findByEmail = jest.fn().mockResolvedValue(validUserData);
		expect(service.createUser(validUserData)).rejects.toThrow(
			new IdentityDomainException('E-mail already exists'),
		);
	});
});
