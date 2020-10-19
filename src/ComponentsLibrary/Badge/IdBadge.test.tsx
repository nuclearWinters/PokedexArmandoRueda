import React from 'react';
import {render} from '@testing-library/react-native';
import {IdBadge} from './IdBadge';

test('IdBadge test', () => {
  const text = 'Testing';
  const {getByText} = render(<IdBadge text={text} />);
  getByText(text);
});
