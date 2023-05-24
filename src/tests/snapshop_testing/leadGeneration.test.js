import renderer from 'react-test-renderer';
import LeadGeneration from '../../components/leadGeneration/leadGeneration';

// Snapshot test for LeadGeneration component
it('renders correctly', () => {
  const mockDeals = [
    {
      id: 18565984,
      name: 'Erica Hubbard',
      email: 'erica@providerscience.com',
      total_value: 14351505632,
      photo_url: null,
      goals: {
        generated_lead: [
          {
            month: '2023-05-01T00:00:00.000Z',
            metric: 'GeneratedLead',
            goal: '1100',
            is_circular: false,
            _id: '6463f7c432dd3214e5928bfb',
          },
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
        generated_lead: [
          {
            month: '2023-05-01T00:00:00.000Z',
            metric: 'GeneratedLead',
            goal: '1000',
            is_circular: true,
            _id: '6463ea0932dd3214e590d62a',
          },
        ],
      },
      total_deals: 254,
      leads_to_demos: 0,
    },
  ];

  // Lead Generation renders correctly
  const tree = renderer.create(
    <LeadGeneration
      allDeals={mockDeals}
      request={true}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();

  // Lead Generation renders correctly with no deals
  const tree2 = renderer.create(
    <LeadGeneration
      allDeals={[]}
      request={true}
    />)
    .toJSON();
  expect(tree2).toMatchSnapshot();
});
