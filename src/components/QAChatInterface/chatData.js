import { BookOpen, Calculator, Lightbulb } from 'lucide-react';

export const initialMessages = [
  {
    id: 1,
    type: 'bot',
    text: "Hello! I'm your AI study assistant. I'm here to help you with any questions about your exam preparation. Feel free to ask me anything!",
    timestamp: new Date().toISOString(),
  }
];

export const quickActions = [
  { icon: BookOpen, label: 'Explain a concept', prompt: 'Can you explain Newton\'s laws of motion?' },
  { icon: Calculator, label: 'Solve a problem', prompt: 'Help me solve this calculus problem' },
  { icon: Lightbulb, label: 'Study tips', prompt: 'Give me study tips for preparing for exams' },
];

