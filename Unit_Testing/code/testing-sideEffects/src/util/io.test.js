import {describe, it, expect, vi} from 'vitest';

import { promises as fs } from 'fs';

import writeData from './io';

vi.mock('fs');
vi.mock('path', () => {
    return {
        default: {
            join: (...args) => {
                return args[args.length - 1];
            }
        }
    };
});

describe('it should execute "writeData" function', () => {
    it('should test the functionality of file operations.', () => {
        const data = 'Hello Testing...';
        const filename = 'test.txt';
    
        const result = writeData(data, filename);
        return expect(result).resolves;
    });


    it('should test the "fs" package internal method "writeFile" using vitest mocks.', () => {
        const data = 'Hello Testing...';
        const filename = 'test.txt';

        fs.writeFile(data, filename)

        expect(fs.writeFile).toBeCalledWith(data, filename)
        expect(fs.writeFile(data, filename)).resolves.toBeUndefined();


    })
});