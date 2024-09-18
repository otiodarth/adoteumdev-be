import {
	BeforeInsert,
	BeforeUpdate,
	CreateDateColumn,
	DeleteDateColumn,
	UpdateDateColumn,
} from 'typeorm';

export abstract class DefaultEntity {
	@BeforeInsert()
	beforeInsert(): void {
		this.CreatedAt = this.CreatedAt || new Date();
	}

	@BeforeUpdate()
	beforeUpdate(): void {
		this.UpdatedAt = new Date();
	}

	@CreateDateColumn({ name: 'DT_CREATED' })
	CreatedAt: Date;

	@UpdateDateColumn({ name: 'DT_UPDATED ' })
	UpdatedAt: Date;

	@DeleteDateColumn({ name: 'DT_DELETED', nullable: true })
	DeletedAt: Date;
}
