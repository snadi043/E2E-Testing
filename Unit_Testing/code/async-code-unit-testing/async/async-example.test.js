import {expect, describe, it, beforeEach} from 'vitest';

import { generateToken, generateTokenPromise } from './async-example';

describe('Unit testing for asynchronous block of code.', (done) => {
    beforeEach(() => {
        const testEmail = "test@test.com";
    });

    it('should test "generateToken()" function by asynchronously calling it and returing the token.', () => {        
        generateToken((err, token) => {
            try{
                expect(token).toBeDefined();
                expect(token).toHaveLength(20);
                expect(token[0]).toBe('a');
                done();
            }catch(err){
                expect(err).toThrowError();
                done();
            }
        });
    });

    it('should test the function "generateTokenPromise" and return the Promise which means it should either resolve or reject.', async() => {
        const token = await generateTokenPromise();

        expect(token).toBeDefined();
    });
});