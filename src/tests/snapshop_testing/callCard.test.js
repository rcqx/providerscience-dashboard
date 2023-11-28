import renderer from 'react-test-renderer';
import CallCard from '../../components/discoveredCalls/callCard';

// Snapshot test for CallCard component
it('renders correctly', () => {
  const mockCard = {
    Name: 'John Doe',
    number: 1,
    profilePicture: 'aString',
    calls: 5,
    percentage: 50,
    goal: 10,
    isCircular: true,
  };

  // Call Card renders correctly
  const tree = renderer.create(
    <CallCard
      name={mockCard.Name}
      number={mockCard.number}
      profilePicture={mockCard.profilePicture}
      calls={mockCard.calls}
      percentage={mockCard.percentage}
      goal={mockCard.goal}
      isCircular={mockCard.isCircular}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();

  // Call Card renders correctly without profile picture
  const tree2 = renderer.create(
    <CallCard
      name={mockCard.Name}
      number={mockCard.number}
      profilePicture={null}
      calls={mockCard.calls}
      percentage={mockCard.percentage}
      goal={mockCard.goal}
      isCircular={mockCard.isCircular}
    />,
  ).toJSON();
  expect(tree2).toMatchSnapshot();
});
