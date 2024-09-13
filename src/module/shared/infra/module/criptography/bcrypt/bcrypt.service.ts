import * as bcrypt from 'bcrypt';

import { Encrypter } from '@identity/domain/interface/encrypter.interface';

export class BcryptService implements Encrypter {
	private saltRounds = 10;

	async encrypt(plainText: string): Promise<string> {
		return bcrypt.hash(plainText, this.saltRounds);
	}

	async validate(plainText: string, hash: string): Promise<boolean> {
		return bcrypt.compare(plainText, hash);
	}
}
