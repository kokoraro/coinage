import matchers from '@testing-library/jest-dom/matchers';
import createFetchMock from 'vitest-fetch-mock';
import { vi, expect } from 'vitest';
import { iconLibrarySetup } from '../utils/iconConfig';

iconLibrarySetup();

const fetchMock = createFetchMock(vi);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMock.enableMocks();

expect.extend(matchers);

process.env = {
    REACT_APP_API_ENDPOINT: 'foo-endpoint',
};
