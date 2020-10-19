import React from 'react';
import {render} from '@testing-library/react-native';
import {PokeNameBadge} from './PokeNameBadge';

test('PokeNameBadge test', () => {
  const text = 'Testing';
  const {getByText} = render(
    <PokeNameBadge text={text} backgroundColor={'#000'} />,
  );
  const textRenders = getByText(text);
  expect(textRenders.parent?.props.style[1].backgroundColor).toBe('#000');
});
