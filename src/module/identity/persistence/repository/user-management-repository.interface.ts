import { DefaultRepositoryInterface } from '../../../shared/infra/module/persistence/repository/default-repository.interface';
import { User } from '../../domain/entity/user';

export interface UserManagementRepositoryInterface
	extends DefaultRepositoryInterface<User> {}
