import renderer from 'react-test-renderer';
import DiscoveredCalls from '../../components/discoveredCalls/discoveredCalls';

// Snapshot test for DiscoveredCall component
it('renders correctly', () => {
  const mockCalls = [
    {
      id: 18565984,
      name: 'Erica Hubbard',
      email: 'erica@providerscience.com',
      total_value: 14351505632,
      photo_url: null,
      goals: {
        generated_calls: [
          {
            month: '2023-03-01T00:00:00.000Z',
            metric: 'GeneratedCall',
            goal: '10',
            is_circular: true,
            _id: '645d53461fbe1dad12e87dfb'
          },
          {
            month: '2023-05-01T00:00:00.000Z',
            metric: 'GeneratedCall',
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
        generated_calls: [
          {
            month: '2023-03-01T00:00:00.000Z',
            metric: 'GeneratedCall',
            goal: '10',
            is_circular: true,
            _id: '645d53461fbe1dad12e87dfb'
          },
          {
            month: '2023-05-01T00:00:00.000Z',
            metric: 'GeneratedCall',
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
  const tree = renderer.create(
    <DiscoveredCalls
      allCalls={mockCalls}
      request={true}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
