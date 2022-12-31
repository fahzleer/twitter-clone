/* eslint-disable import/no-unused-modules */
// @ts-ignore
module.exports = {
    testMatch: ['**/*.spec.{ts,tsx}'],
    collectCoverageFrom: ['src/helpers/**/*.ts'],
    coveragePathIgnorePatterns: ['.(config).{ts|js}', '/__tests__/'],
}
