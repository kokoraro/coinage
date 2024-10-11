import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import Footer from './Footer';

describe('Footer component', () => {
    it('should render out a set of text', () => {
        render(<Footer />);
        expect(screen.getByText('coded by')).toBeTruthy();
        expect(screen.getByText('charlie taylor')).toBeTruthy();
        expect(screen.getByText('data sourced from')).toBeTruthy();
        expect(screen.getByText('cryptocompare api')).toBeTruthy();
    });
});
