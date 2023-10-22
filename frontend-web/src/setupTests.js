// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

export default {
    preset: 'ts-jest/presets/js-with-ts',
    transform: {
        '^.+\\.(js|ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '^axios$': 'axios',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js'],
};
