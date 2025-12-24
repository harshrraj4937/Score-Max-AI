import { FileText, Video, BookMarked } from 'lucide-react';

export const filters = [
  { id: 'all', label: 'All Resources' },
  { id: 'notes', label: 'Study Notes' },
  { id: 'videos', label: 'Video Lectures' },
  { id: 'practice', label: 'Practice Tests' },
];

export const resources = [
  {
    id: 1,
    type: 'notes',
    icon: FileText,
    title: 'Complete Physics Notes - Mechanics',
    description: 'Comprehensive notes covering all topics in mechanics with solved examples',
    subject: 'Physics',
    downloads: '12.5K',
    rating: 4.8,
    color: 'blue'
  },
  {
    id: 2,
    type: 'videos',
    icon: Video,
    title: 'Organic Chemistry Video Series',
    description: '25 hours of detailed video lectures on organic chemistry reactions',
    subject: 'Chemistry',
    downloads: '8.2K',
    rating: 4.9,
    color: 'purple'
  },
  {
    id: 3,
    type: 'practice',
    icon: BookMarked,
    title: 'Mathematics Practice Test Series',
    description: '50 practice tests with detailed solutions and explanations',
    subject: 'Mathematics',
    downloads: '15.3K',
    rating: 4.7,
    color: 'green'
  },
  {
    id: 4,
    type: 'notes',
    icon: FileText,
    title: 'Modern History Study Material',
    description: 'Complete notes on modern Indian history with important dates',
    subject: 'History',
    downloads: '9.8K',
    rating: 4.6,
    color: 'blue'
  },
  {
    id: 5,
    type: 'videos',
    icon: Video,
    title: 'Calculus Masterclass',
    description: 'Advanced calculus concepts explained with real-world applications',
    subject: 'Mathematics',
    downloads: '11.2K',
    rating: 4.9,
    color: 'purple'
  },
  {
    id: 6,
    type: 'practice',
    icon: BookMarked,
    title: 'English Grammar & Comprehension',
    description: '100+ exercises for grammar, vocabulary, and reading comprehension',
    subject: 'English',
    downloads: '7.6K',
    rating: 4.5,
    color: 'green'
  },
];

