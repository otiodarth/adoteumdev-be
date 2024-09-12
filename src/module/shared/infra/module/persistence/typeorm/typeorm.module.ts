import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmTestConfig } from './config/typeorm-config-test';

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmTestConfig)],
})
export class TypeOrmPersistenceModule {}
