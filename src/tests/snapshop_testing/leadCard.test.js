import renderer from 'react-test-renderer';
import LeadCard from '../../components/leadGeneration/leadCard';

// Snapshot test for LeadCard component
it('renders correctly', () => {
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

  // Lead Card renders correctly
  const tree = renderer
    .create(
      <LeadCard
        name={mockCard.name}
        index={mockCard.index}
        number={mockCard.number}
        profilePicture={mockCard.profilePicture}
        percentage={mockCard.percentage}
        deals={mockCard.deals}
        leadsToDemos={mockCard.leadsToDemos}
        goal={mockCard.goal}
        allDeals={mockCard.allDeals}
        isCircular={mockCard.isCircular}
      />)
    .toJSON();
  expect(tree).toMatchSnapshot();

  // Lead Card renders correctly with no profile picture
  const tree2 = renderer
    .create(
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
        isCircular={mockCard.isCircular}
      />)
    .toJSON();
  expect(tree2).toMatchSnapshot();
});
