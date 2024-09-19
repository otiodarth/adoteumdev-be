import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entity';

export const configDbMemory: TypeOrmModuleOptions = {
	type: 'sqlite',
	database: ':memory:',
	synchronize: true,
	entities: [UserEntity],
};
