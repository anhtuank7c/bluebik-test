import * as React from 'react';
import renderer from 'react-test-renderer';

import { Pagination } from '../Pagination';

it(`renders correctly`, () => {
  const tree = renderer.create(<Pagination data={[1, 2, 3]} currentStep={1} />).toJSON();

  expect(tree).toMatchSnapshot();
});
