import { render } from '@testing-library/react';
import Button from './Button';

it('renders the Button component', () => {
  expect(render(<Button />)).toMatchSnapshot();
});
