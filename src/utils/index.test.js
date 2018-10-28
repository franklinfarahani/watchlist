import {getGenreName} from './';

test('get "Drama" given genre id 6', () => {
  expect(getGenreName(6));
});