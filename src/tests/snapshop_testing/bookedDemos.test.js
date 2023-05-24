import renderer from 'react-test-renderer';
import BookedDemos from '../../components/bookedDemos/bookedDemos';

// Snapshot test for BookedDemos component
it('renders correctly', () => {
  const mockDemos = [
    {
      id: 18565984,
      name: 'Erica Hubbard',
      email: 'erica@providerscience.com',
      total_value: 14351505632,
      photo_url: null,
      goals: {
        generated_demo: [
          {
            month: '2023-03-01T00:00:00.000Z',
            metric: 'GeneratedDemo',
            goal: '10',
            is_circular: true,
            _id: '645d53461fbe1dad12e87dfb'
          },
          {
            month: '2023-05-01T00:00:00.000Z',
            metric: 'GeneratedDemo',
            goal: '15',
            is_circular: true,
            _id: '6463c25132dd3214e58bcfa2'
          }
        ],
      },
      total_deals: 773,
      leads_to_demos: 0,
    },
    {
      id: 18277410,
      name: 'Cole Elledge',
      email: 'cole@providerscience.com',
      total_value: 4642462140,
      photo_url: null,
      goals: {
        generated_demo: [
          {
            month: '2023-03-01T00:00:00.000Z',
            metric: 'GeneratedDemo',
            goal: '10',
            is_circular: true,
            _id: '645d53461fbe1dad12e87dfb'
          },
          {
            month: '2023-05-01T00:00:00.000Z',
            metric: 'GeneratedDemo',
            goal: '15',
            is_circular: true,
            _id: '6463c25132dd3214e58bcfa2'
          }
        ],
      },
      total_deals: 254,
      leads_to_demos: 0,
    },
  ];

  // BookedDemos renders correctly
  const tree = renderer.create(
    <BookedDemos
      allDemos={mockDemos}
      request={true}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();

  // BookedDemos renders correctly with no demos
  const tree2 = renderer.create(
    <BookedDemos
      allDemos={[]}
      request={true}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
