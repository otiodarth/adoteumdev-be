export abstract class ValueObject<T> {
	protected readonly _value: T;

	constructor(value: T) {
		this._value = value;
	}

	equals(vo?: ValueObject<T>): boolean {
		if (vo === null || vo === undefined) {
			return false;
		}
		return this._value === vo._value;
	}

	get value(): T {
		return this._value;
	}
}
