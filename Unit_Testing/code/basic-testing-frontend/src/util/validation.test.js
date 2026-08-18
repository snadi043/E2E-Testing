import {it, describe, expect} from 'vitest';

import { validateStringNotEmpty } from './validation';
import { validateNumber } from './validation';

describe('unit testing for "validationStringNotEmpty" function.', () => {
    it('should pass the test after trimming and eliminating unwanted data from the input value is not empty.', () => {
        const value = 'hello World.';
        const resultFn = () => {
                validateStringNotEmpty(value);
            }
        expect(resultFn).not.toThrow();
    });

    it('should throw error when nothing is passed as value.', () => {
        const resultFn = () => {
                validateStringNotEmpty();
            }
        expect(resultFn).toThrow();
    });

    it('should throw an error if the input value is assigned to null.', () => {
        const inputValue = '';
        const resultFn = () => {
            validateStringNotEmpty(inputValue);
        }
        expect(resultFn).toThrow(/Invalid input - must not be empty./);
    });
});

describe('unit test for "validateNumber" function', () => {
    it('should throw an error if the input is not a int/boolean type of value.', () => {
        const inputValue1 = 'number';
        const inputValue2 = '123';
        const inputValue3 = ''
        const resultFn = () => {
            validateNumber(inputValue1);
            validateNumber(inputValue2);
            validateNumber(inputValue3);

        }
        expect(resultFn).toThrow(/Invalid number input./);
    });
});