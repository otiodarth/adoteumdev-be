import { BcryptService } from '@criptography/bcrypt/bcrypt.service';
import { Module } from '@nestjs/common';
import { PersistenceModule } from '@persistence/persistence.module';
import { UserManagementRepository } from '@persistence/typeorm/repository/user-management.repository';
import { UserManagementApplicationService } from './application/service/user-management-application.service';
import { EncryptService } from './domain/service/encrypt-service';
import { UserManagementController } from './http/rest/controller/user-management.controller';

@Module({
	imports: [PersistenceModule],
	providers: [
		UserManagementRepository,
		UserManagementApplicationService,
		EncryptService,
		{
			provide: 'Encrypter',
			useClass: BcryptService,
		},
	],
	controllers: [UserManagementController],
})
export class IdentityModule {}
