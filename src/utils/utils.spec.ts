import { endpoint } from './endpoint';

describe('Utils tests', () => {
  test('test endpoint function', () => {
    expect(endpoint('films')).toEqual('https://swapi.dev/api/films');
  });
});
