import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from '.';

describe('Header Tests', () => {
  it('should render the Header component', () => {
    render(<Header />);
    let h1Element = screen.getByTestId('header-h1');
    expect (h1Element).toBeInTheDocument();
    expect(h1Element).toHaveTextContent('RESTy');
  });
});