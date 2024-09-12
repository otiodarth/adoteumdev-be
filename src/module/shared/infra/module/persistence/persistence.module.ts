import { Module } from '@nestjs/common';
import { TypeOrmPersistenceModule } from './typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './typeorm/model/user.entity';

@Module({
	imports: [TypeOrmPersistenceModule, TypeOrmModule.forFeature([UserEntity])],
	exports: [TypeOrmModule],
})
export class PersistenceModule {}
