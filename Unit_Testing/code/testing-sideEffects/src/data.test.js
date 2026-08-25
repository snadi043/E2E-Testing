import {it, describe, expect, vi} from 'vitest';

import { generateReportData } from './data';

describe('Test suite for data related functionalities in the application.', () => {
    it('should test the function "generateReportData()" is called.', () => {
        const loggerFn = vi.fn();

        const result = generateReportData(loggerFn);

        expect(loggerFn).toBeCalled();
        expect(result).toBe('Some dummy data for this demo app');
    });
});