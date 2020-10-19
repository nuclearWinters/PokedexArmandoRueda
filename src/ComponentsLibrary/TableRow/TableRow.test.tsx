import React from 'react';
import {render} from '@testing-library/react-native';
import {TableRow} from './TableRow';

test('TableRow test', () => {
  const title = 'title';
  const description = 'description';
  const {getByText} = render(
    <TableRow
      title={title}
      description={description}
      backgroundColor={'#000'}
    />,
  );
  const titleRender = getByText(title);
  expect(titleRender.parent?.props.style[0].backgroundColor).toEqual('#000');
  const descriptionRender = getByText(description);
  expect(descriptionRender.parent?.props.style[0].backgroundColor).toEqual(
    '#000',
  );
});
