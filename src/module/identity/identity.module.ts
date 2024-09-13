import { BcryptService } from '@criptography/bcrypt/bcrypt.service';
import { EncryptService } from './domain/service/encrypt-service';
import { Module } from '@nestjs/common';
import { PersistenceModule } from '../shared/infra/module/persistence/persistence.module';
import { UserManagementApplicationService } from './application/service/user-management-application.service';
import { UserManagementController } from './http/rest/controller/user-management.controller';
import { UserManagementRepository } from '../shared/infra/module/persistence/typeorm/repository/user-management.repository';

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
