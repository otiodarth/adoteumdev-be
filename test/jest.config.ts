module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFiles: ['<rootDir>/test/setup.ts'],
	moduleNameMapper: {
		'^@shared/(.*)$': '<rootDir>/src/module/shared/$1',
		'^@userManagement/(.*)$': '<rootDir>/src/module/user-management/$1',
	},
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
		},
	},
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	rootDir: './',
	testMatch: ['**/*.spec.ts'],
};
