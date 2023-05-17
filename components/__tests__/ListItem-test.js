import * as React from 'react';
import renderer from 'react-test-renderer';

import { ListItem } from '../ListItem';

it(`renders correctly`, () => {
  const tree = renderer.create(<ListItem value={true} onChangeValue={newValue => console.log('newValue', newValue)} />).toJSON();

  expect(tree).toMatchSnapshot();
});
