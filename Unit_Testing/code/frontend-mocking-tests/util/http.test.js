import {it, describe, expect, vi} from 'vitest';

import { sendDataRequest } from './http';

const testResponseData = {key:'abc', data: 'Hello World'}

const mockFetchFn = vi.fn((url, dataOptions) => {
    return new Promise((resolve, reject) => {
        if(typeof(dataOptions.body) !== 'string'){
            reject('Data object is not converted into string.');
        }
        resolve({
            ok: true,
            json(){
                return new Promise((resolve, reject) => {
                resolve(testResponseData)
                });
            } 
        })
    });
}); 

vi.stubGlobal('fetch', mockFetchFn);

describe('Tests for mocking the HTTP request in the application.', () => {
    it('should return the testResponseData when the fetch mock function is triggered and resolves.', () => {
        const testData = {key: 'hi', status: 200}
        return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
    });

    it('should pass when the testData and its and internal properties passed resolves to match the data types.', () => {
        const testData = { key: 'hi'}

        return expect(sendDataRequest(testData)).resolves.toBeTypeOf('object');
        return expect(sendDataRequest(testData.key)).resolves.toBe('hi');
        return expect(sendDataRequest(testData.status)).resolves.toEqual(200);
    });

    it('should throw an error if the response is not converted into string.', () => {
        const testData = { key: 'hi'}

       

        return expect(sendDataRequest(testData)).rejects;
        
    });
});