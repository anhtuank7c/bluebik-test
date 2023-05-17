import * as React from 'react';
import renderer from 'react-test-renderer';

import { View } from '../View';

it(`renders correctly`, () => {
  const onPress = jest.fn()
  const tree = renderer.create(<View style={{ width: 100, height: 100 }} lightColor='red' darkColor='green' />).toJSON();

  expect(tree).toMatchSnapshot();
});
