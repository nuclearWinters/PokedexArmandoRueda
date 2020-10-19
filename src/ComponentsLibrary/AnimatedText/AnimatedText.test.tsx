import React from 'react';
import {render} from '@testing-library/react-native';
import {AnimatedText} from './AnimatedText';

test('AnimatedText test', async () => {
  const text = 'Testing';
  const {getByText} = render(<AnimatedText name={text} />);
  const textRender = getByText(text);
  expect(textRender.parent?.props.style[1].opacity.__getValue()).toBe(0);
});
