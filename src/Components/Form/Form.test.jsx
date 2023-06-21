import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Form from '.';

describe('Test Form functions', () => { 
  test('changes state as expected', () => {
    render(<Form />);
    
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'https://pokeapi.co/api/v2/pokemon' } });
    expect(input.value).toBe('https://pokeapi.co/api/v2/pokemon');
  });
  test('should trim url', () => { 
    render(<Form />);
    
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: '     https://pokeapi.co/api/v2/pokemon     ' } });
    expect(input.value.trim()).toBe('https://pokeapi.co/api/v2/pokemon');
   })

   test('should return method as capitalized string', () => { 
    render(<Form />);

    const get = screen.getByTestId('get');
    fireEvent.click(get);
    expect(get.textContent).toBe('GET');
    })

   test('should add active class to selected method', () => { 
    render(<Form />);

    const get = screen.getByTestId('get');
    fireEvent.click(get);
    expect(get.classList.contains('active')).toBe(true);
    })

});