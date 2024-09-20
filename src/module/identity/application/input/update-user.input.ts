import { User } from '@identity/domain/entity/user';

export class UpdateUserInput {
	constructor(data: Partial<User>) {
		Object.assign(this, data);
	}
}
