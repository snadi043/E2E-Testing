import {it, describe, expect} from 'vitest';

import cleanNumbers from './cleanNumbers';

describe('unit tests for "cleanNumbers" function.', () => {
    it('should check for type of the inputValues and transform them to int values.', () => {
        const inputValues = ['2','3','4'];
        const result = cleanNumbers(inputValues);

        const invalidInput = ['2','three','4'];
        const resultFn = () => {
            cleanNumbers(invalidInput);
        }

        expect(result).toBeTypeOf('object');
        expect(resultFn).toThrowError(/Invalid number input/);
        expect(result).toHaveLength(3);
    });
});