import {reducer} from './Device';

describe('Device actions', () => {
  it('should return hasInternet = false', () => {
    expect(reducer(undefined, {type: 'SET_INTERNET', payload: false})).toEqual({
      hasInternet: false,
    });
  });
});
