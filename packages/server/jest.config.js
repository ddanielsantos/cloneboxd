/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  preset: 'ts-jest',
  globalSetup: '<rootDir>/test/globalSetup.ts',
  globalTeardown: '<rootDir>/test/globalTeardown.ts',
  setupFilesAfterEnv: [
    '<rootDir>/test/setupFile.ts'
  ],
  testEnvironment: 'node',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  }
}
