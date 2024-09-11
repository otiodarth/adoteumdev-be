export abstract class ValueObject<T> {
	protected readonly value: T;

	constructor(aValue: T) {
		this.value = aValue;
	}

	equals(vo?: ValueObject<T>): boolean {
		if (vo === null || vo === undefined) {
			return false;
		}

		if (vo.constructor !== this.constructor) {
			return false;
		}

		return vo.value === this.value;
	}

	getValue(): T {
		return this.value;
	}
}
