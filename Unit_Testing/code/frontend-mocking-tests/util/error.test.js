import {it, describe, expect} from 'vitest';
import { HttpError, ValidationError } from './errors';

describe('Unit test suite for "Error" functionality.', () => {
    it('should be called when all the class parameters are passed.', () => {
        const statusCode = 401;
        const message = {message: 'Your Request Has Failed.'};
        const data = {method: 'POST', title: 'Unable to process.'};

        const response = new HttpError(statusCode, message, data);
    
        expect(response.statusCode).toBe(401);
        expect(response.data.method).toBe('POST');
    });

    it('should throw the validation error when an error is identified.', () => {
        const message = {message: 'Your Request Has Failed.'}
        const statusCode = 401;
        const data = {method: 'POST', title: 'Unable to process.'};

        const result = new HttpError(statusCode, message, data);

        expect(result).toBeTypeOf('object');
        expect(result.message.message).toBeTypeOf('string');
    });

    it('should be able to call the internal method "message" when an error is identified.', () => {
        const message = {message: 'Your Request Has Failed.'}
        
        const result = new ValidationError(message);

        expect(result).to.haveOwnProperty('message');
        expect(result.message.message).contains('Your Request Has Failed.');
    });
});