import renderer from 'react-test-renderer';
import DemoCard from '../../components/bookedDemos/demoCard';

// Snapshot test for DemoCard component
it('renders correctly', () => {
  const mockCard = {
    Name: 'John Doe',
    number: 1,
    profilePicture: 'aString',
    demos: 5,
    percentage: 50,
    madeCalls: 1,
    goal: 10,
    isCircular: true,
  };

  // Demo Card renders correctly
  const tree = renderer.create(
    <DemoCard
      name={mockCard.Name}
      number={mockCard.number}
      profilePicture={mockCard.profilePicture}
      demos={mockCard.demos}
      percentage={mockCard.percentage}
      madeCalls={mockCard.madeCalls}
      goal={mockCard.goal}
      isCircular={mockCard.isCircular}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();

  // Demo Card renders correctly without profile picture
  const tree2 = renderer.create(
    <DemoCard
      name={mockCard.Name}
      number={mockCard.number}
      profilePicture={null}
      demos={mockCard.demos}
      percentage={mockCard.percentage}
      madeCalls={mockCard.madeCalls}
      goal={mockCard.goal}
      isCircular={mockCard.isCircular}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
