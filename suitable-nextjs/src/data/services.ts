export interface ServiceReview {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
  helpful: number
}

export interface Service {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  originalPrice?: number
  image: string
  category: 'consultation' | 'design' | 'marketing' | 'development' | 'media'
  type: 'online' | 'in-person' | 'both'
  duration: string
  features: string[]
  averageRating: number
  totalReviews: number
  reviews: ServiceReview[]
  loyaltyPoints: number
  isPopular: boolean
  isNew: boolean
  tags: string[]
}

export const servicesData: Service[] = [
  {
    id: 'entrepreneur-consultation',
    name: 'Entrepreneurs and SMEs Consultations',
    description: 'Get expert guidance from experienced entrepreneurs to help grow your business.',
    longDescription: 'Our experienced entrepreneurs provide comprehensive guidance to help you navigate the challenges of running a business. Whether you\'re just starting out or looking to scale, our experts offer personalized advice tailored to your specific needs.',
    price: 350,
    originalPrice: 400,
    image: '/assets/images/EntrepreneurConsultation.jpg',
    category: 'consultation',
    type: 'both',
    duration: '60-90 minutes',
    features: [
      'Business strategy development',
      'Market analysis and positioning',
      'Financial planning guidance',
      'Growth strategy consultation',
      'Follow-up support included'
    ],
    averageRating: 4.8,
    totalReviews: 127,
    reviews: [
      {
        id: '1',
        userId: 'user1',
        userName: 'Sarah Johnson',
        userAvatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAxMEMyMi43NjE0IDEwIDI1IDEyLjIzODYgMjUgMTVDMjUgMTcuNzYxNCAyMi43NjE0IDIwIDIwIDIwQzE3LjIzODYgMjAgMTUgMTcuNzYxNCAxNSAxNUMxNSAxMi4yMzg2IDE3LjIzODYgMTAgMjAgMTBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCAyMEMxNi4wNzY5IDIwIDEzIDIzLjA3NjkgMTMgMjZWMzBIMjdWMjZDMjcgMjMuMDc2OSAyMy45MjMxIDIwIDIwIDIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K',
        rating: 5,
        comment: 'Excellent consultation! The expert provided valuable insights that helped me restructure my business model. Highly recommended!',
        date: '2024-01-15',
        helpful: 12
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Michael Chen',
        userAvatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAxMEMyMi43NjE0IDEwIDI1IDEyLjIzODYgMjUgMTVDMjUgMTcuNzYxNCAyMi43NjE0IDIwIDIwIDIwQzE3LjIzODYgMjAgMTUgMTcuNzYxNCAxNSAxNUMxNSAxMi4yMzg2IDE3LjIzODYgMTAgMjAgMTBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCAyMEMxNi4wNzY5IDIwIDEzIDIzLjA3NjkgMTMgMjZWMzBIMjdWMjZDMjcgMjMuMDc2OSAyMy45MjMxIDIwIDIwIDIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K',
        rating: 4,
        comment: 'Very professional and knowledgeable. The session was well-structured and provided actionable advice.',
        date: '2024-01-10',
        helpful: 8
      }
    ],
    loyaltyPoints: 35,
    isPopular: true,
    isNew: false,
    tags: ['business', 'strategy', 'consultation', 'entrepreneur']
  },
  {
    id: 'individual-consultation',
    name: 'Individual Brands Consultation',
    description: 'Personalized brand development and marketing strategy for individual entrepreneurs.',
    longDescription: 'Transform your personal brand into a powerful business asset. Our experts help you develop a compelling brand identity, create effective marketing strategies, and build a strong online presence that resonates with your target audience.',
    price: 350,
    originalPrice: 400,
    image: '/assets/images/IndividualConsultation.jpg',
    category: 'consultation',
    type: 'both',
    duration: '60-90 minutes',
    features: [
      'Personal brand development',
      'Marketing strategy creation',
      'Social media optimization',
      'Content strategy planning',
      'Brand consistency guidelines'
    ],
    averageRating: 4.7,
    totalReviews: 89,
    reviews: [
      {
        id: '3',
        userId: 'user3',
        userName: 'Emma Rodriguez',
        userAvatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAxMEMyMi43NjE0IDEwIDI1IDEyLjIzODYgMjUgMTVDMjUgMTcuNzYxNCAyMi43NjE0IDIwIDIwIDIwQzE3LjIzODYgMjAgMTUgMTcuNzYxNCAxNSAxNUMxNSAxMi4yMzg2IDE3LjIzODYgMTAgMjAgMTBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCAyMEMxNi4wNzY5IDIwIDEzIDIzLjA3NjkgMTMgMjZWMzBIMjdWMjZDMjcgMjMuMDc2OSAyMy45MjMxIDIwIDIwIDIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K',
        rating: 5,
        comment: 'Amazing service! They helped me completely rebrand my personal image and the results have been incredible.',
        date: '2024-01-12',
        helpful: 15
      }
    ],
    loyaltyPoints: 35,
    isPopular: true,
    isNew: false,
    tags: ['branding', 'personal', 'marketing', 'strategy']
  },
  {
    id: 'media-services',
    name: 'Media Services',
    description: 'Professional photography and videography services for your business needs.',
    longDescription: 'Capture your brand\'s essence with our professional media services. From product photography to promotional videos, we create compelling visual content that tells your story and engages your audience.',
    price: 850,
    originalPrice: 1000,
    image: '/assets/images/EntrepreneurConsultation.jpg', // Placeholder
    category: 'media',
    type: 'in-person',
    duration: '4-8 hours',
    features: [
      'Professional photography',
      'Video production',
      'Photo editing and retouching',
      'Video editing and post-production',
      'High-resolution deliverables'
    ],
    averageRating: 4.9,
    totalReviews: 45,
    reviews: [
      {
        id: '4',
        userId: 'user4',
        userName: 'David Kim',
        userAvatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAxMEMyMi43NjE0IDEwIDI1IDEyLjIzODYgMjUgMTVDMjUgMTcuNzYxNCAyMi43NjE0IDIwIDIwIDIwQzE3LjIzODYgMjAgMTUgMTcuNzYxNCAxNSAxNUMxNSAxMi4yMzg2IDE3LjIzODYgMTAgMjAgMTBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCAyMEMxNi4wNzY5IDIwIDEzIDIzLjA3NjkgMTMgMjZWMzBIMjdWMjZDMjcgMjMuMDc2OSAyMy45MjMxIDIwIDIwIDIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K',
        rating: 5,
        comment: 'Outstanding quality! The photos and videos exceeded my expectations. Professional, creative, and delivered on time.',
        date: '2024-01-08',
        helpful: 9
      }
    ],
    loyaltyPoints: 85,
    isPopular: false,
    isNew: true,
    tags: ['photography', 'videography', 'media', 'visual']
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    description: 'Professional graphic design services for logos, branding, and marketing materials.',
    longDescription: 'Elevate your brand with stunning visual designs. Our creative team specializes in logo design, branding packages, marketing materials, and digital assets that make your business stand out.',
    price: 650,
    originalPrice: 750,
    image: '/assets/images/IndividualConsultation.jpg', // Placeholder
    category: 'design',
    type: 'online',
    duration: '3-5 days',
    features: [
      'Logo design and branding',
      'Marketing materials design',
      'Social media graphics',
      'Print design services',
      'Multiple revision rounds'
    ],
    averageRating: 4.6,
    totalReviews: 78,
    reviews: [
      {
        id: '5',
        userId: 'user5',
        userName: 'Lisa Thompson',
        userAvatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAxMEMyMi43NjE0IDEwIDI1IDEyLjIzODYgMjUgMTVDMjUgMTcuNzYxNCAyMi43NjE0IDIwIDIwIDIwQzE3LjIzODYgMjAgMTUgMTcuNzYxNCAxNSAxNUMxNSAxMi4yMzg2IDE3LjIzODYgMTAgMjAgMTBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCAyMEMxNi4wNzY5IDIwIDEzIDIzLjA3NjkgMTMgMjZWMzBIMjdWMjZDMjcgMjMuMDc2OSAyMy45MjMxIDIwIDIwIDIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K',
        rating: 4,
        comment: 'Great design work! They understood my vision and delivered exactly what I needed.',
        date: '2024-01-05',
        helpful: 6
      }
    ],
    loyaltyPoints: 65,
    isPopular: false,
    isNew: false,
    tags: ['design', 'logo', 'branding', 'graphics']
  },
  {
    id: 'social-media-marketing',
    name: 'Social Media & Marketing',
    description: 'Comprehensive social media management and digital marketing strategies.',
    longDescription: 'Boost your online presence with our comprehensive social media and marketing services. We create engaging content, manage your social accounts, and implement effective marketing campaigns that drive results.',
    price: 750,
    originalPrice: 900,
    image: '/assets/images/EntrepreneurConsultation.jpg', // Placeholder
    category: 'marketing',
    type: 'online',
    duration: 'Ongoing',
    features: [
      'Social media management',
      'Content creation and scheduling',
      'Paid advertising campaigns',
      'Analytics and reporting',
      'Community management'
    ],
    averageRating: 4.7,
    totalReviews: 92,
    reviews: [
      {
        id: '6',
        userId: 'user6',
        userName: 'Alex Martinez',
        userAvatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAxMEMyMi43NjE0IDEwIDI1IDEyLjIzODYgMjUgMTVDMjUgMTcuNzYxNCAyMi43NjE0IDIwIDIwIDIwQzE3LjIzODYgMjAgMTUgMTcuNzYxNCAxNSAxNUMxNSAxMi4yMzg2IDE3LjIzODYgMTAgMjAgMTBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCAyMEMxNi4wNzY5IDIwIDEzIDIzLjA3NjkgMTMgMjZWMzBIMjdWMjZDMjcgMjMuMDc2OSAyMy45MjMxIDIwIDIwIDIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K',
        rating: 5,
        comment: 'Fantastic results! My social media engagement increased by 300% in just two months.',
        date: '2024-01-03',
        helpful: 18
      }
    ],
    loyaltyPoints: 75,
    isPopular: true,
    isNew: false,
    tags: ['social media', 'marketing', 'digital', 'content']
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    description: 'Professional email marketing campaigns and automation services.',
    longDescription: 'Connect with your audience through powerful email marketing campaigns. We design beautiful emails, create compelling content, and set up automated sequences that nurture leads and drive conversions.',
    price: 550,
    originalPrice: 650,
    image: '/assets/images/IndividualConsultation.jpg', // Placeholder
    category: 'marketing',
    type: 'online',
    duration: '2-3 weeks',
    features: [
      'Email campaign design',
      'Automated sequences',
      'A/B testing',
      'Analytics and optimization',
      'List management'
    ],
    averageRating: 4.5,
    totalReviews: 56,
    reviews: [
      {
        id: '7',
        userId: 'user7',
        userName: 'Rachel Green',
        userAvatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAxMEMyMi43NjE0IDEwIDI1IDEyLjIzODYgMjUgMTVDMjUgMTcuNzYxNCAyMi43NjE0IDIwIDIwIDIwQzE3LjIzODYgMjAgMTUgMTcuNzYxNCAxNSAxNUMxNSAxMi4yMzg2IDE3LjIzODYgMTAgMjAgMTBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCAyMEMxNi4wNzY5IDIwIDEzIDIzLjA3NjkgMTMgMjZWMzBIMjdWMjZDMjcgMjMuMDc2OSAyMy45MjMxIDIwIDIwIDIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K',
        rating: 4,
        comment: 'Great email templates and automation setup. My open rates improved significantly.',
        date: '2024-01-01',
        helpful: 7
      }
    ],
    loyaltyPoints: 55,
    isPopular: false,
    isNew: false,
    tags: ['email', 'marketing', 'automation', 'campaigns']
  },
  {
    id: 'website-development',
    name: 'Website Development',
    description: 'Custom website development and web application solutions.',
    longDescription: 'Build a powerful online presence with our custom website development services. From simple business websites to complex web applications, we create responsive, fast, and user-friendly solutions that drive business growth.',
    price: 1200,
    originalPrice: 1500,
    image: '/assets/images/EntrepreneurConsultation.jpg', // Placeholder
    category: 'development',
    type: 'online',
    duration: '2-4 weeks',
    features: [
      'Custom website design',
      'Responsive development',
      'Content management system',
      'SEO optimization',
      'Performance optimization'
    ],
    averageRating: 4.8,
    totalReviews: 34,
    reviews: [
      {
        id: '8',
        userId: 'user8',
        userName: 'James Wilson',
        userAvatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAxMEMyMi43NjE0IDEwIDI1IDEyLjIzODYgMjUgMTVDMjUgMTcuNzYxNCAyMi43NjE0IDIwIDIwIDIwQzE3LjIzODYgMjAgMTUgMTcuNzYxNCAxNSAxNUMxNSAxMi4yMzg2IDE3LjIzODYgMTAgMjAgMTBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCAyMEMxNi4wNzY5IDIwIDEzIDIzLjA3NjkgMTMgMjZWMzBIMjdWMjZDMjcgMjMuMDc2OSAyMy45MjMxIDIwIDIwIDIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K',
        rating: 5,
        comment: 'Exceptional work! The website is fast, beautiful, and exactly what I envisioned. Highly professional team.',
        date: '2023-12-28',
        helpful: 11
      }
    ],
    loyaltyPoints: 120,
    isPopular: false,
    isNew: true,
    tags: ['web development', 'website', 'custom', 'responsive']
  }
]

export const getServiceById = (id: string): Service | undefined => {
  return servicesData.find(service => service.id === id)
}

export const getServicesByCategory = (category: string): Service[] => {
  return servicesData.filter(service => service.category === category)
}

export const getPopularServices = (): Service[] => {
  return servicesData.filter(service => service.isPopular)
}

export const getNewServices = (): Service[] => {
  return servicesData.filter(service => service.isNew)
}

