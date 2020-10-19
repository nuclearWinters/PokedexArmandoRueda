import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {BackButton} from './BackButton';

const mock = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => {
    return {goBack: mock};
  },
}));

test('BackButton test', () => {
  const {getByText} = render(<BackButton />);
  const backRenders = getByText('Back');
  fireEvent(backRenders, 'onPress');
  expect(mock).toHaveBeenCalledTimes(1);
});
