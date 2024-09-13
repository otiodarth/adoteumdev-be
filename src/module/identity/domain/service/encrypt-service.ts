import { Inject, Injectable } from '@nestjs/common';
import { Encrypter } from '../interface/encrypter.interface';

@Injectable()
export class EncryptService {
	constructor(
		@Inject('Encrypter')
		private readonly encrypter: Encrypter,
	) {}

	async encrypt(plainText: string): Promise<string> {
		return this.encrypter.encrypt(plainText);
	}
}
