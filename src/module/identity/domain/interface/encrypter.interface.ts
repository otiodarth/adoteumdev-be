export interface Encrypter {
	encrypt(plainText: string): Promise<string>;
	validate(plainText: string, hash: string): Promise<boolean>;
}
