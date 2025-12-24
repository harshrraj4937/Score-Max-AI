# Architecture Documentation

## Modular Component Structure

This project follows a modular architecture pattern where each major feature has its own folder with sub-components, making the codebase easy to maintain and scale.

## Folder Structure Benefits

### 1. **Separation of Concerns**
Each feature module (ExamSelectInterface, ResourceLibrary, QAChatInterface) is self-contained with its own:
- UI components
- Data files
- Utility functions
- Export configuration

### 2. **Easy to Scale**
Adding new features is straightforward:
- Create a new folder under `components/`
- Add sub-components as needed
- Export through `index.js`
- Import in `App.jsx`

### 3. **Maintainability**
- Changes to one module don't affect others
- Easy to locate files for debugging
- Clear component hierarchy
- Reusable sub-components

## Module Breakdown

### ExamSelectInterface Module

```
ExamSelectInterface/
├── ExamSelectInterface.jsx   # Main container, manages state
├── SearchBar.jsx             # Reusable search input
├── ExamCategory.jsx          # Groups exams by category
├── ExamCard.jsx              # Displays individual exam
├── examData.js               # Centralized data (ready for API)
├── utils.js                  # Difficulty color helper
└── index.js                  # Clean exports
```

**Responsibilities:**
- Display categorized exams
- Search functionality
- Exam selection and navigation

**Future Enhancements:**
- Replace `examData.js` with API calls
- Add exam details modal
- Implement filtering by difficulty/popularity

### ResourceLibrary Module

```
ResourceLibrary/
├── ResourceLibrary.jsx       # Main container, manages filters
├── SearchBar.jsx             # Search resources
├── FilterTabs.jsx            # Type-based filtering
├── ResourceGrid.jsx          # Layout container
├── ResourceCard.jsx          # Individual resource display
├── resourceData.js           # Mock resource data
├── utils.js                  # Color scheme helpers
└── index.js                  # Module export
```

**Responsibilities:**
- Display learning resources
- Filter by type (notes, videos, practice)
- Search functionality

**Future Enhancements:**
- Connect to backend API
- Add download functionality
- Implement bookmarking
- Add preview functionality

### QAChatInterface Module

```
QAChatInterface/
├── QAChatInterface.jsx       # Main container, manages chat state
├── ChatMessages.jsx          # Messages list container
├── MessageBubble.jsx         # Individual message component
├── QuickActions.jsx          # Pre-defined prompts
├── ChatInput.jsx             # Input area with send button
├── chatData.js               # Initial messages & quick actions
└── index.js                  # Module export
```

**Responsibilities:**
- Real-time chat interface
- Message display and input
- Quick action buttons

**Future Enhancements:**
- Connect to AI backend (OpenAI, Claude, etc.)
- Add message history persistence
- Implement file upload
- Add code syntax highlighting
- Voice input support

## Shared Components

Located directly under `components/`:

### Header.jsx
- Global navigation
- Logo and branding
- Settings and user profile access

### WelcomeSection.jsx
- Hero section with greeting
- Platform statistics
- Animated elements

### OptionCard.jsx
- Reusable card component
- Used on home page for feature selection
- Supports different color themes

## Data Management

Currently using hardcoded data files:
- `examData.js` - Exam categories and details
- `resourceData.js` - Learning resources
- `chatData.js` - Initial messages and quick actions

### Migration to API

When ready for backend integration:

1. Create `src/services/` folder
2. Add API service files:
   ```
   services/
   ├── examService.js
   ├── resourceService.js
   └── chatService.js
   ```

3. Replace data imports with API calls:
   ```javascript
   // Before
   import { examCategories } from './examData';
   
   // After
   import { fetchExamCategories } from '@/services/examService';
   const examCategories = await fetchExamCategories();
   ```

## State Management

Currently using React hooks (useState):
- Simple and sufficient for current scale
- Each module manages its own state

### Future State Management Options

As the app grows, consider:
- **Context API** - For sharing state between modules
- **Redux/Zustand** - For complex state management
- **React Query** - For server state and caching

## Styling Architecture

Using Tailwind CSS with custom theme:
- Dark theme colors in `tailwind.config.js`
- Consistent color palette across modules
- Utility-first approach for rapid development

### Color Scheme
```javascript
colors: {
  dark: {
    bg: '#1a1a1a',
    card: '#2a2a2a',
    cardHover: '#333333',
    border: '#404040',
    text: '#e0e0e0',
    textSecondary: '#a0a0a0',
  },
  accent: {
    blue: '#4a9eff',
    purple: '#8b5cf6',
    green: '#10b981',
  }
}
```

## Adding New Features

### Step-by-Step Guide

1. **Create Feature Folder**
   ```bash
   mkdir src/components/NewFeature
   ```

2. **Create Main Component**
   ```javascript
   // src/components/NewFeature/NewFeature.jsx
   import React from 'react';
   
   const NewFeature = ({ onBack }) => {
     return <div>New Feature Content</div>;
   };
   
   export default NewFeature;
   ```

3. **Add Sub-Components**
   Create necessary sub-components in the same folder

4. **Create Data File** (if needed)
   ```javascript
   // src/components/NewFeature/featureData.js
   export const featureData = [...];
   ```

5. **Add Export File**
   ```javascript
   // src/components/NewFeature/index.js
   export { default } from './NewFeature';
   ```

6. **Import in App.jsx**
   ```javascript
   import NewFeature from './components/NewFeature';
   ```

7. **Add Navigation Logic**
   Update the options array and switch statement in `App.jsx`

## Testing Strategy (Future)

Recommended testing approach:
- **Unit Tests**: Individual components (Jest + React Testing Library)
- **Integration Tests**: Module functionality
- **E2E Tests**: User flows (Cypress/Playwright)

## Performance Considerations

- Lazy load modules using React.lazy()
- Implement virtual scrolling for large lists
- Memoize expensive computations
- Code splitting at route level

## Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox

---

**Last Updated:** December 2025
**Version:** 1.0.0

