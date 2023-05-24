import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LeadGeneration from '../../components/leadGeneration/leadGeneration';

// Number of deals must be maximun 6 leadCards
test('Number of deals must be maximun 6 leadCards', () => {
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
    {
      id: 18565985,
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
      id: 18277411,
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
    {
      id: 18565986,
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
      id: 18277412,
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
  render(
    <LeadGeneration
      allDeals={mockDeals}
      request={true}
    />);
  expect(screen.getAllByText(/leads created/i).length).toBe(6);
});

// If no deals length zero, display message
test('Display "No leads created message"', () => {
  render(
    <LeadGeneration
      allDeals={[
        {
          id: 18565984,
          name: 'Erica Hubbard',
          email: 'erica@providerscience.com',
          total_value: 14351505632,
          photo_url: null,
          goals: null,
          total_deals: 0,
          leads_to_demos: 0,
        },
      ]}
      request={true}
    />);
  expect(screen.getByText(/No deals generated/i)).toBeInTheDocument();
});
