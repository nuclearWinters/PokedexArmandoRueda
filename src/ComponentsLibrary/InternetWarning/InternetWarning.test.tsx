import React from 'react';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import {InternetWarning} from './InternetWarning';
import {Provider} from 'react-redux';
import {store} from '../../Redux';

test('InternetWarning test', async () => {
  store.dispatch({type: 'SET_INTERNET', payload: false});
  const {getByText} = render(
    <Provider store={store}>
      <InternetWarning />
    </Provider>,
  );
  const xRenders = getByText('X');
  getByText('No tienes conexión a internet');
  getByText('Es posible que la app no funcione correctamente');
  await waitForElementToBeRemoved(() => {
    fireEvent(xRenders, 'onPress');
    return xRenders;
  });
});
