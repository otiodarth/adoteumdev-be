import { User } from '@identity/domain/entity/user';
import { DefaultRepositoryInterface } from '@persistence/repository/default-repository.interface';

export interface UserManagementRepositoryInterface
	extends DefaultRepositoryInterface<User> {
	findByEmail(email: string): Promise<User>;
}
