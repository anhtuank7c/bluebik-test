import * as React from 'react';
import renderer from 'react-test-renderer';

import { Card } from '../Card';

it(`renders correctly`, () => {
  const tree = renderer.create(<Card rounded="medium" lightColor='red' darkColor='blue'>Snapshot test!</Card>).toJSON();

  expect(tree).toMatchSnapshot();
});
