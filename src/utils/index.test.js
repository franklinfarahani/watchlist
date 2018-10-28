import {getGenreName, getProvider} from './';

test('get "Drama" given genre id 6', () => {
  expect(getGenreName(6)).toBe('Drama');
});

test('get "Netflix" given provider id 8', () => {
  expect(getProvider(8).label).toBe('Netflix');
});