module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['app/controller/**/*.ts'],
  coverageReporters: ['text', 'text-summary']
}
