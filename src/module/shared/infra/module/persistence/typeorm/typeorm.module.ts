import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDbDevelop } from './config/typeorm-config-db-develop';
import { configDbMemory } from './config/typeorm-config-db-memory';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: () => {
				if (process.env.NODE_ENV === 'test') {
					return configDbMemory;
				} else if (process.env.NODE_ENV === 'develop') {
					return configDbDevelop;
				}
			},
		}),
	],
})
export class TypeOrmPersistenceModule {}
