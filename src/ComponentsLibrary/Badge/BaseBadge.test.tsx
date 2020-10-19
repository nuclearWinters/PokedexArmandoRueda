import React from 'react';
import {render} from '@testing-library/react-native';
import {BaseBadge} from './BaseBadge';

test('BaseBadge test', () => {
  const text = 'Testing';
  const {getByText} = render(
    <BaseBadge text={text} textStyle={{}} style={{}} />,
  );
  const textRender = getByText(text);
  expect(textRender.props.style).toEqual({});
  expect(textRender.parent?.props.style).toEqual({});
});
