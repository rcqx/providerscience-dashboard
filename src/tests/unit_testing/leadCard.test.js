import { render, screen } from '@testing-library/react';
import LeadCard from '../../components/leadGeneration/leadCard';

// Circle progress bar renders if isCircular is true
test('Circle progress bar renders if isCircular is true', () => {
  const mockCard = {
    name: 'John Doe',
    index: 0,
    number: 1,
    profilePicture: 'aString',
    percentage: 50,
    deals: 1,
    leadsToDemos: 5,
    goal: 10,
    allDeals: [],
    isCircular: true,
  };

  render(
    <LeadCard
      name={mockCard.name}
      index={mockCard.index}
      number={mockCard.number}
      profilePicture={null}
      percentage={mockCard.percentage}
      deals={mockCard.deals}
      leadsToDemos={mockCard.leadsToDemos}
      goal={mockCard.goal}
      allDeals={mockCard.allDeals}
      isCircular={true}
    />);

  expect(screen.getByRole('presentation')).toBeTruthy();
});

// Regular progress bar renders if isCircular set to false
test('Circle progress bar renders if isCircular is true', () => {
  const mockCard = {
    name: 'John Doe',
    index: 0,
    number: 1,
    profilePicture: 'aString',
    percentage: 50,
    deals: 1,
    leadsToDemos: 5,
    goal: 10,
    allDeals: [],
    isCircular: true,
  };

  render(
    <LeadCard
      name={mockCard.name}
      index={mockCard.index}
      number={mockCard.number}
      profilePicture={null}
      percentage={mockCard.percentage}
      deals={mockCard.deals}
      leadsToDemos={mockCard.leadsToDemos}
      goal={mockCard.goal}
      allDeals={mockCard.allDeals}
      isCircular={false}
    />);

  expect(screen.getByTestId('progress-bar-regular')).toBeTruthy();
});
