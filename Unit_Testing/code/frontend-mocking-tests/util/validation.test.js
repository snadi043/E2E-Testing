import {it, describe, expect} from 'vitest';

import { validateNotEmpty } from './validation';
import { ValidationError } from './errors';

describe('Unit test cases for "validationNotEmpty" function.', () => {
    it('should check if the user input is validated in terms of its length and empty features', () => {
        const text = "Hello World";

        const errorMessage = "Input length should not be zero";

        const result = validateNotEmpty(text, errorMessage);

        expect(result).not.toBeNull();
    });

    it('should throw an error if a null value is passed as an input.', () => {
        const text = null;
        const errorMessage = "Input length should not be zero";
        
        const result = () => validateNotEmpty(text, errorMessage);

        expect(result).toThrow(errorMessage);
    });

        it('should throw an error if an empty value is passed as an input.', () => {
        const text = '';
        const errorMessage = "Input length should not be zero";
        
        const result = () => validateNotEmpty(text, errorMessage);

        expect(result).toThrow(errorMessage);
    });
});

