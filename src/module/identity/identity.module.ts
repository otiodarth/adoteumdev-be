import { Module } from '@nestjs/common';
import { UserManagementApplicationService } from './application/service/user-management-application.service';
import { UserManagementRepository } from '@shared/infra/module/persistence/typeorm/repository/user-management.repository';
import { PersistenceModule } from '@shared/infra/module/persistence/persistence.module';
import { UserManagementController } from './http/rest/controller/user-management.controller';

@Module({
	imports: [PersistenceModule],
	providers: [UserManagementRepository, UserManagementApplicationService],
	controllers: [UserManagementController],
})
export class IdentityModule {}
