import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import App from './App';

// from the docs: https://testing-library.com/docs/react-testing-library/example-intro/#full-example
const server = setupServer(
  rest.get('/testGet', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}))
  }),
)

// establish API mocking BEFORE running the tests below
beforeAll(() => server.listen())

// reset any handlers that are declared as part of our tests
// i.e. for testing one-time error scenarios
afterEach(() => server.resetHandlers())

// clean up after tests are done.  turn. things. off.
afterAll(() => server.close())

describe('App component integration', () => {
  it('allows form use and renders expected results', async () => {
    render(<App />);
    let urlInput = screen.getByTestId('input');
    let getSpan = screen.getByTestId('get');
    let button = screen.getByTestId('button');

    fireEvent.change(urlInput, {target: {value: '/testGet'}});
    fireEvent.click(getSpan);
    fireEvent.click(button);

    let pre = await screen.findByTestId('results');
    expect(pre).toHaveTextContent('hello there');

    let methodDiv = screen.getByTestId('app-div-method');
    let urlDiv = screen.getByTestId('app-div-url');
    expect(methodDiv).toHaveTextContent('GET');
    expect(urlDiv).toHaveTextContent('/testGet')

  });
});
