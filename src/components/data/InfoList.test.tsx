import { render } from '@testing-library/react';
import InfoList, { InfoListItem } from './InfoList';

it('renders the InfoList component with a string array', () => {
  const mockInfo = ['Hello there', 'this is some mock info'];
  expect(render(<InfoList list={mockInfo} />)).toMatchSnapshot();
});

it('renders the InfoList component with an InfoListItem array', () => {
  const mockInfo: InfoListItem[] = [
    { value: 'Hello there' },
    { tooltip: ['this is some mock info but longer'], value: 'this is some mock info' },
    { value: 'this is some really long mock info that is so long that it would need to be line clamped', clamp: true },
  ];
  expect(render(<InfoList list={mockInfo} />)).toMatchSnapshot();
});
