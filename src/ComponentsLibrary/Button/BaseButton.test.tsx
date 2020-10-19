import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {BaseButton} from './BaseButton';

const mock = jest.fn();

test('BaseButton test', () => {
  const text = 'text';
  const {getByText} = render(
    <BaseButton onPress={mock} text={text} style={{}} textStyle={{}} />,
  );
  const textRenders = getByText(text);
  fireEvent(textRenders, 'onPress');
  expect(textRenders.props.style).toEqual({});
  expect(textRenders.parent?.props.style).toEqual({});
  expect(mock).toHaveBeenCalledTimes(1);
});
