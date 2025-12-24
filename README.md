# AI Exam Preparation Platform

A beautiful, modern React-based single-page application for AI-powered exam preparation, inspired by NotebookLM's clean interface.

## Features

### 🎯 Three Main Interfaces

1. **Exam Select Interface** - Browse and select from various competitive exams with detailed information
2. **Resource Library** - Access curated study materials, video lectures, and practice tests
3. **Q&A Chat Interface** - Chat with an AI assistant for instant study help

### ✨ Key Highlights

- Modern, dark-themed UI with smooth animations
- Responsive design that works on all devices
- Modular component architecture
- Built with React and Tailwind CSS
- User-friendly navigation
- Beautiful gradients and hover effects

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx                       # Top navigation header
│   ├── WelcomeSection.jsx               # Hero section with greeting
│   ├── OptionCard.jsx                   # Reusable card component
│   ├── ExamSelectInterface/             # Exam selection module
│   │   ├── ExamSelectInterface.jsx      # Main component
│   │   ├── SearchBar.jsx                # Search functionality
│   │   ├── ExamCategory.jsx             # Category container
│   │   ├── ExamCard.jsx                 # Individual exam card
│   │   ├── examData.js                  # Hardcoded exam data
│   │   ├── utils.js                     # Helper functions
│   │   └── index.js                     # Module export
│   ├── ResourceLibrary/                 # Resource library module
│   │   ├── ResourceLibrary.jsx          # Main component
│   │   ├── SearchBar.jsx                # Search functionality
│   │   ├── FilterTabs.jsx               # Filter controls
│   │   ├── ResourceGrid.jsx             # Grid container
│   │   ├── ResourceCard.jsx             # Individual resource card
│   │   ├── resourceData.js              # Hardcoded resource data
│   │   ├── utils.js                     # Helper functions
│   │   └── index.js                     # Module export
│   └── QAChatInterface/                 # Chat interface module
│       ├── QAChatInterface.jsx          # Main component
│       ├── ChatMessages.jsx             # Messages container
│       ├── MessageBubble.jsx            # Individual message
│       ├── QuickActions.jsx             # Quick action buttons
│       ├── ChatInput.jsx                # Input area
│       ├── chatData.js                  # Initial data & actions
│       └── index.js                     # Module export
├── App.jsx                              # Main app component
├── main.jsx                             # Entry point
└── index.css                            # Global styles
```

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## Current Status

This is the UI-only version with hardcoded data. Backend API integration is planned for future updates.

## Future Enhancements

- Backend API integration
- User authentication
- Real AI chat functionality
- Progress tracking
- Personalized recommendations
- Mobile app version

## License

MIT

---

Built with ❤️ for students preparing for competitive exams

