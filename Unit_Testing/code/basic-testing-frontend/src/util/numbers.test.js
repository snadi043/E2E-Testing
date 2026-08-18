import {it, describe, expect} from 'vitest';

import { transformToNumber } from './numbers';

describe('unit testing for the "numbers" function.', () => {
    it('should test if the string number value is converted into int number value.', () => {
        const inputNumber = '23';
        const result = transformToNumber(inputNumber);
        expect(result).to.be.eq(23);
    });

    it('should throw an error if any value except int or string version of int is given as input.', () => {
        const inputNumber = 'hello';
        const result = transformToNumber(inputNumber);
        const resultFn = () => {
            transformToNumber(inputNumber);
        }
        expect(result).toBeNaN();
        expect(resultFn).toThrow;
    });

    it('should throw an error if no input is given.', () => {
        const resultFn = () => {
            transformToNumber(inputNumber);
        }
        expect(resultFn).toThrow();
    });
});