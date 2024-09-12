import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryColumn()
	id: string;

	@Column()
	firstname: string;

	@Column()
	lastname: string;

	@Column()
	email: string;

	@Column()
	role: string;

	constructor(
		anId: string,
		aFirstname: string,
		aLastname: string,
		anEmail: string,
		aRole: string,
	) {
		this.id = anId;
		this.firstname = aFirstname;
		this.lastname = aLastname;
		this.email = anEmail;
		this.role = aRole;
	}
}
