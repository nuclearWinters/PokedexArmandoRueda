import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {PokedexLayout} from './PokedexLayout';
import {Text} from 'react-native';

const mock = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => {
    return {navigate: mock};
  },
}));

test('InternetWarning test', async () => {
  const {getByTestId, getAllByTestId, getByText} = render(
    <PokedexLayout BigButtonOnPress={mock}>
      <Text>Test</Text>
    </PokedexLayout>,
  );
  getByText('Test');
  const bigButton = getByTestId('BigButton');
  const smallButtons = getAllByTestId('SmallButton');
  expect(smallButtons.length).toBe(3);
  fireEvent(bigButton, 'onPress');
  fireEvent(smallButtons[0], 'onPress');
  fireEvent(smallButtons[1], 'onPress');
  fireEvent(smallButtons[2], 'onPress');
  expect(mock).toHaveBeenCalledTimes(4);
});
