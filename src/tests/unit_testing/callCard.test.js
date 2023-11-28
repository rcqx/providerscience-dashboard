import { render, screen } from '@testing-library/react';
import CallCard from '../../components/discoveredCalls/callCard';

// Circle progress bar renders if isCircular is true
test('Circle progress bar renders if isCircular is true', () => {
  const mockCard = {
    name: 'John Doe',
    number: 1,
    profilePicture: 'aString',
    percentage: 50,
    calls: 1,
    goal: 10,
    isCircular: true,
  };

  render(
    <CallCard
      name={mockCard.name}
      number={mockCard.number}
      profilePicture="aString"
      percentage={mockCard.percentage}
      calls={mockCard.calls}
      goal={mockCard.goal}
      isCircular={true}
    />);
  expect(screen.getByRole('presentation')).toBeTruthy();
});

// Regular progress bar renders if isCircular set to false
test('Circle progress bar renders if isCircular is true', () => {
  render(
    <CallCard
      name="John Doe"
      number={1}
      profilePicture="aString"
      percentage={50}
      calls={1}
      goal={10}
      isCircular={false}
    />);

  expect(screen.getByTestId('progress-bar-regular')).toBeTruthy();
});
