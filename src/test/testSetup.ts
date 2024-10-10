import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import { iconLibrarySetup } from '../utils/iconConfig';

iconLibrarySetup();

expect.extend(matchers);
