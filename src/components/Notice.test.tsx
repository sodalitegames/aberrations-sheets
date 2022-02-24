import { fireEvent, render, screen } from '@testing-library/react';

import Notice, { NoticeStatus } from './Notice';

it('renders the Notice component with a string message', () => {
  const mockMessage = 'Hello there this is a mock message';
  expect(render(<Notice status={NoticeStatus.Warn} message={mockMessage} />)).toMatchSnapshot();
});

it('renders the Notice component with a string array message', () => {
  const mockMessage = ['Hello there', 'this is a mock message'];
  expect(render(<Notice status={NoticeStatus.Info} message={mockMessage} />)).toMatchSnapshot();
});

it('correctly dimisses notice when close button is clicked', () => {
  const mockMessage = 'Hello there this is a mock message';
  render(<Notice status={NoticeStatus.Warn} message={mockMessage} hideable />);

  expect(screen.getByText('Hello there this is a mock message')).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('close-notice-button'));

  expect(screen.queryByText('Hello there this is a mock message')).not.toBeInTheDocument();
});
