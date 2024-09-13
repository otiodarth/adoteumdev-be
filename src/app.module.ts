import { Module } from '@nestjs/common';
import { IdentityModule } from './module/identity/identity.module';

@Module({
	imports: [IdentityModule],
})
export class AppModule {}
