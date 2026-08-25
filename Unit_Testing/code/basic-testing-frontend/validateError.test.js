import {it, describe, expect} from 'vitest';

import { validateError } from './validateError';

describe('unit tests for "validateError" function', () => {
    it('should test the functionality of the validateError function to return the string values.', () => {
        const inputValue1 = '1';
        const inputValue2 = 'invalid';
        const inputValue3 = 123;
        const inputValue4 = 'no-calc';
     
        const result1 = validateError(inputValue1);
        const result2 = validateError(inputValue2);
        const result3 = validateError(inputValue3);
        const result4 = validateError(inputValue4);
    
        expect(result1).toBeTypeOf('string');
        expect(result2).eq('Invalid input. You must enter valid numbers.');
        expect(result2).toBeTypeOf('string');
        expect(result3).toBeTypeOf('string');
        expect(result4).to.be.eq('');

    });
});