export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  price: number
  category?: string
  image: string
  description?: string
  attendees?: number
  maxAttendees?: number
  featured?: boolean
  type?: string
  platform?: string
}

export const allEvents: Event[] = [
  {
    id: '1',
    title: 'Bayhill Premier Cup',
    date: '2025-12-15',
    time: '09:00',
    location: 'South Africa',
    price: 450,
    category: 'Sports',
    image: '/assets/images/BayHillExample.jpeg',
    attendees: 1200,
    maxAttendees: 1500,
    description: 'Biggest Youth Soccer Tournament in South Africa Held Annually',
    featured: true,
  },
  {
    id: '2',
    title: 'CUSTOMER RELATIONSHIPS, MARKETING & PROJECT WORKFLOWS',
    date: '2025-09-17',
    time: 'Online Event',
    location: 'Virtual Platform',
    price: 300,
    category: 'Business',
    image: '/assets/images/BayHillExample.jpeg',
    type: 'Online Event',
    platform: 'Virtual Platform',
  },
  {
    id: '3',
    title: 'Let\'s Elevate, Cape Town',
    date: '2025-11-06',
    time: '10:00 AM',
    location: 'Workshop 17 Kloof Street',
    price: 150,
    image: '/assets/images/Cape-Town.png',
  },
  {
    id: '4',
    title: 'Let\'s Elevate, Johannesburg',
    date: '2025-11-13',
    time: '10:00 AM',
    location: 'Workshop 17, Hyde Park',
    price: 150,
    image: '/assets/images/Johannesburg.png',
  },
  {
    id: '5',
    title: 'Let\'s Elevate, Durban',
    date: '2025-11-19',
    time: '10:00 AM',
    location: 'Workshop 17, Ballito',
    price: 150,
    image: '/assets/images/Durban.png',
  },
  {
    id: '6',
    title: 'Let\'s Elevate, Gqeberha',
    date: '2025-11-26',
    time: '10:00 AM',
    location: 'TBC',
    price: 150,
    image: '/assets/images/Gqebhera.png',
  },
]

