module.exports = {
    preset: 'ts-jest',
    rootDir: '.',
    silent: true,
    roots: [
        '<rootDir>/lib/',
        '<rootDir>/test/'
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/lib/**/*.{ts, js}'
    ],
    coveragePathIgnorePatterns: [
        '<rootDir>/node_modules',
        '<rootDir>/test',
        '<rootDir>/lib/index.ts'
    ],
    coverageDirectory: './test/reports/jest',
    coverageReporters: [
        'html'
    ],
    transform: {
        '.ts': 'ts-jest'
    },
    moduleFileExtensions: [
        'ts',
        'js'
    ]
};
