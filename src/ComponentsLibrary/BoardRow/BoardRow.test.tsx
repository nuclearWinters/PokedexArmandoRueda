import React from 'react';
import {render} from '@testing-library/react-native';
import {BoardRow} from './BoardRow';

test('BoardRow test', () => {
  const title = 'title';
  const description = 'description';
  const {getByText} = render(
    <BoardRow
      title={title}
      description={description}
      leftStyle={{}}
      rightStyle={{}}
    />,
  );
  const titleRender = getByText(title);
  expect(titleRender.parent?.props.style[1]).toEqual({});
  const descriptionRender = getByText(description);
  expect(descriptionRender.parent?.props.style[1]).toEqual({});
});
