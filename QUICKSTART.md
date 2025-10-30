# LovaBolt - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## ✅ Bug Fixes Applied

All critical bugs have been fixed! The application now:
- ✅ Builds without errors
- ✅ Has no memory leaks
- ✅ Includes error boundary for crash protection
- ✅ Has proper type safety
- ✅ Handles localStorage errors gracefully

See `FIXES_SUMMARY.md` for detailed information.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── cards/          # Reusable card components
│   ├── layout/         # Layout components (Header, Sidebar, etc.)
│   ├── modals/         # Modal dialogs
│   ├── steps/          # Wizard step components
│   ├── ui/             # shadcn/ui components
│   ├── ErrorBoundary.tsx  # Error handling
│   ├── WelcomePage.tsx
│   └── WizardLayout.tsx
├── contexts/
│   └── BoltBuilderContext.tsx  # Global state management
├── data/
│   └── wizardData.ts   # Static data (layouts, themes, etc.)
├── types/
│   └── index.ts        # TypeScript type definitions
├── lib/
│   └── utils.ts        # Utility functions
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

---

## 🎯 Key Features

### 1. Multi-Step Wizard
- Project Setup
- Layout Selection
- Design Style
- Color Theme
- Typography
- Visual Elements
- Functionality
- Animations
- Preview & Generate

### 2. Auto-Save
- Automatically saves progress to localStorage
- Loads saved project on return
- Handles corrupted data gracefully

### 3. Prompt Generation
- **Basic Mode:** Concise prompt for quick projects
- **Detailed Mode:** Comprehensive prompt with all specifications

### 4. Error Handling
- Error Boundary catches React errors
- localStorage error recovery
- User-friendly error messages

---

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

### Tech Stack
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Routing:** React Router v7
- **State Management:** React Context
- **Icons:** Lucide React

---

## 📝 Usage

### 1. Start the Wizard
Click "Get Started" on the welcome page

### 2. Fill Out Each Step
- Provide project information
- Select layout and design preferences
- Choose colors, typography, and visual elements
- Add functionality requirements
- Select animations

### 3. Generate Prompt
Click "Generate Prompt" to create your AI-ready prompt

### 4. Copy & Use
- Copy the generated prompt
- Use with Bolt.new or Lovable.dev
- Start building your project!

---

## 🐛 Troubleshooting

### Build Errors
If you encounter build errors:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### localStorage Issues
If the app won't load saved data:
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Delete `lovabolt-project` key
4. Refresh the page

### Port Already in Use
If port 5173 is busy:
```bash
# Kill the process or use a different port
npm run dev -- --port 3000
```

---

## 🎨 Customization

### Adding New Design Styles
Edit `src/data/wizardData.ts`:
```typescript
export const designStyles: DesignStyle[] = [
  {
    id: 'your-style',
    title: 'Your Style',
    description: 'Description of your style'
  },
  // ... existing styles
];
```

### Adding New Color Themes
```typescript
export const colorThemes: ColorTheme[] = [
  {
    id: 'your-theme',
    title: 'Your Theme',
    description: 'Description',
    colors: ['#color1', '#color2', '#color3'],
    distribution: [40, 40, 20]
  },
  // ... existing themes
];
```

### Modifying Prompt Template
Edit the `generatePrompt()` function in `src/contexts/BoltBuilderContext.tsx`

---

## 📚 Documentation

- `README.md` - Project overview
- `FIXES_SUMMARY.md` - Detailed bug fixes
- `BUGFIXES.md` - Bug tracking document
- This file - Quick start guide

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is private. All rights reserved.

---

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review `FIXES_SUMMARY.md` for known issues
3. Contact the development team

---

## ✨ What's New

### Latest Updates (Bug Fixes)
- ✅ Fixed all Button component imports
- ✅ Fixed memory leaks in WelcomePage
- ✅ Improved type safety throughout
- ✅ Added Error Boundary component
- ✅ Enhanced localStorage error handling
- ✅ Fixed all TypeScript strict mode errors

**Status:** Production Ready ✅

---

**Happy Building! 🚀**
