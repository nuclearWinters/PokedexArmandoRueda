import {setInternet} from './Device';

describe('Device actions', () => {
  it('setInternet action', () => {
    const expectedAction = {
      type: 'SET_INTERNET',
      payload: true,
    };
    expect(setInternet(true)).toEqual(expectedAction);
  });
});
