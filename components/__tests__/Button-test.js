import * as React from 'react';
import renderer from 'react-test-renderer';

import { Button } from '../Button';

it(`renders correctly`, () => {
  const onPress = jest.fn()
  const tree = renderer.create(<Button onPress={onPress} title="Primary" preset="primary" />).toJSON();

  expect(tree).toMatchSnapshot();
});
