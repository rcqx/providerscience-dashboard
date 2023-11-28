import { render, screen } from '@testing-library/react';
import BookedDemos from '../../components/bookedDemos/bookedDemos';

test('Number of demoCards must be 6', () => {
  const mockDemos = [
    {
      id: 18565984,
      name: 'Erica Hubbard',
      email: 'erica@providerscience.com',
      total_value: 14351505632,
      photo_url: null,
      goals: {
        generated_demo: [],
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
        generated_demo: [],
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
        generated_demo: [],
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
        generated_demo: [],
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
        generated_demo: [],
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
        generated_demo: [],
      },
      total_deals: 254,
      leads_to_demos: 0,
    },
  ];
  render(
    <BookedDemos
      allDemos={mockDemos}
      request={true}
    />);
  expect(screen.getAllByText(/booked demos/i).length).toBe(7);
});
