import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ErrorRetry} from './ErrorRetry';

const mock = jest.fn();

test('ErrorRetry test', () => {
  const text = 'Intentar de nuevo';
  const {getByText} = render(<ErrorRetry onPress={mock} />);
  const textRenders = getByText(text);
  fireEvent(textRenders, 'onPress');
  getByText('Ha ocurrido un error. Intenta de nuevo');
  expect(mock).toHaveBeenCalledTimes(1);
});
