import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'USERS' })
export class UserEntity {
	@PrimaryGeneratedColumn('increment', { name: 'US_ID' })
	UserId: number;

	@Column({ name: 'US_GUID' })
	UserGuid: string;

	@Column({ name: 'US_FNAME' })
	FirstName: string;

	@Column({ name: 'US_LNAME' })
	LastName: string;

	@Column({ name: 'US_EMAIL' })
	EmailAddress: string;

	@Column({ name: 'US_ROLE' })
	Role: string;

	@Column({ name: 'US_PASSWORD' })
	Password: string;

	constructor(
		anGuid: string,
		aFirstName: string,
		aLastName: string,
		anEmail: string,
		aRole: string,
		aPassword: string,
	) {
		this.UserGuid = anGuid;
		this.FirstName = aFirstName;
		this.LastName = aLastName;
		this.EmailAddress = anEmail;
		this.Role = aRole;
		this.Password = aPassword;
	}
}
