import {getGenreName, getProvider, formatRuntime, formatDate} from './';

test('get "Drama" given genre id 6', () => {
  expect(getGenreName(6)).toBe('Drama');
});

test('get "Netflix" given provider id 8', () => {
  expect(getProvider(8).label).toBe('Netflix');
});

test('get 2 hours and 4 minutes given 124', () => {
  expect(formatRuntime(124)).toEqual({hours: 2, minutes: 4});
});

test('get 28 October 2018 given "2018-10-28"', () => {
  expect(formatDate('2018-10-28')).toEqual({year: '2018', month: 'October', day: '28'});
});