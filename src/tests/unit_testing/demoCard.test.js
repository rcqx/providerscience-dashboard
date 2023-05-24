import { render, screen } from '@testing-library/react';
import DemoCard from '../../components/bookedDemos/demoCard';

// Circle progress bar renders if isCircular is true
test('Circle progress bar renders if isCircular is true', () => {
  const mockCard = {
    name: 'John Doe',
    number: 1,
    profilePicture: 'aString',
    demos: 5,
    percentage: 50,
    madeCalls: 100,
    goal: 10,
    isCircular: true,
  };

  render(
    <DemoCard
      name={mockCard.name}
      number={mockCard.number}
      profilePicture={null}
      demos={mockCard.demos}
      percentage={mockCard.percentage}
      madeCalls={mockCard.madeCalls}
      goal={mockCard.goal}
      isCircular={true}
    />);
  expect(screen.getByRole('presentation')).toBeTruthy();
});

// Regular progress bar renders if isCircular set to false
test('Circle progress bar renders if isCircular is true', () => {
  const mockCard = {
    name: 'John Doe',
    number: 1,
    profilePicture: 'aString',
    demos: 5,
    percentage: 50,
    madeCalls: 100,
    goal: 10,
    isCircular: false,
  };

  render(
    <DemoCard
      name={mockCard.name}
      number={mockCard.number}
      profilePicture={null}
      demos={mockCard.demos}
      percentage={mockCard.percentage}
      madeCalls={mockCard.madeCalls}
      goal={mockCard.goal}
      isCircular={mockCard.isCircular}
    />);

  expect(screen.getByTestId('progress-bar-regular')).toBeTruthy();
});

// SVG default Profile picture renders if profilePicture is null
test("SVG default Profile picture renders if profilePicture is null", () => {
  const mockCard = {
    name: 'John Doe',
    number: 1,
    profilePicture: null,
    demos: 5,
    percentage: 50,
    madeCalls: 100,
    goal: 10,
    isCircular: false,
  };

  render(
    <DemoCard
      name={mockCard.name}
      number={mockCard.number}
      profilePicture={null}
      demos={mockCard.demos}
      percentage={mockCard.percentage}
      madeCalls={mockCard.madeCalls}
      goal={mockCard.goal}
      isCircular={mockCard.isCircular}
    />);
  expect(screen.getByTestId('default-profile-picture')).toBeTruthy();
});

// Profile picture renders if profilePicture props is passed correclty
test("Profile picture renders if profilePicture props is passed correclty", () => {
  const mockCard = {
    name: 'John Doe',
    number: 1,
    profilePicture: "pictureProfileProp",
    demos: 5,
    percentage: 50,
    madeCalls: 100,
    goal: 10,
    isCircular: false,
  };

  render(
    <DemoCard
      name={mockCard.name}
      number={mockCard.number}
      profilePicture={mockCard.profilePicture}
      demos={mockCard.demos}
      percentage={mockCard.percentage}
      madeCalls={mockCard.madeCalls}
      goal={mockCard.goal}
      isCircular={mockCard.isCircular}
    />);
  expect(screen.getByTestId('profile-picture')).toBeTruthy();
  // expect 1st name of user to be rendered
  expect(screen.getByText(/John/i)).toBeTruthy();
  // renders booked demos string
  expect(screen.getByText(/Booked Demos/i)).toBeTruthy();
});
