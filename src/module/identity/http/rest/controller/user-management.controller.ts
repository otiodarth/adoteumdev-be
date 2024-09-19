import { CreateUserInput } from '@identity/application/input/create-user.input';
import { UserManagementApplicationService } from '@identity/application/service/user-management-application.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class UserManagementController {
	constructor(private readonly _service: UserManagementApplicationService) {}

	@Post('users')
	async createUser(@Body() data: CreateUserInput) {
		return this._service.createUser(data);
	}
}
