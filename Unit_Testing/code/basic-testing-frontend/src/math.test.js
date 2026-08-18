import {it, describe, expect} from 'vitest';

import { add } from './math';

describe('Testing the "add" function', () => {
    it('should result in correct value when adding the array of numbers given as input.', () => {
        // Arrange
        const inputNumbers = [2,3,4];
        // Act
        const expectedResult = inputNumbers.reduce((prev, curr) => prev + curr, 0);
        // Assert
        expect(expectedResult).to.be.eq(9);
    });

    it('should fail the test when one of the values in the input array is not an integer value.', () => {
        const inputValue = ['Hello', 2];
        const expectedResult = add(inputValue)
        expect(expectedResult).to.be.NaN;
    });

    it('should allow the string value of integers to pass the test.', () => {
        const inputNumbers = ['2','3'];
        const expectedResult = inputNumbers.reduce((prev, curr) => +prev + +curr);
        expect(expectedResult).to.be.eq(5);
    });

    it('should result in 0 when an empty value array is passed as input.', () => {
        const inputNumbers = [];
        const result = add(inputNumbers);
        expect(result).to.be.eq(0);
    });

    it('should throw an error when the input array is not defined.', () => {
        expect(() => add()).toThrow();
    });

    it('should throw an error when a input value which is not an array is passed.', () => {
        const inputValue1 = 1;
        const inputValue2 = 2;

        const resultFn = () => {
            add(inputValue1, inputValue2);
        }

        expect(resultFn).toThrow();
        expect(resultFn).toThrow(/numbers is not iterable/);
    })
})