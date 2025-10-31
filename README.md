# 🚀 LovaBolt - Advanced Prompt Generator

<div align="center">

![LovaBolt Logo](https://img.shields.io/badge/LovaBolt-Prompt%20Generator-blue?style=for-the-badge)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Transform your website ideas into detailed, actionable prompts for AI development tools**

[Features](#-features) • [Getting Started](#-getting-started) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

LovaBolt is an intelligent prompt generator designed specifically for AI-powered development tools like **Bolt.new** and **Lovable.dev**. It guides you through a comprehensive wizard to capture every aspect of your website vision and generates professional, detailed prompts that AI tools can understand perfectly.

### Why LovaBolt?

- 🎯 **Precision**: Capture every design detail with our guided wizard
- 🚀 **Speed**: Generate comprehensive prompts in minutes, not hours
- 💡 **Smart**: Intelligent defaults and suggestions based on your project type
- 🎨 **Beautiful**: Stunning glassmorphism UI with smooth animations
- 💾 **Auto-save**: Never lose your progress with automatic local storage
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile

---

## ✨ Features

### 🧙‍♂️ **Intelligent Wizard**
Step-by-step guidance through 11 comprehensive sections:
- **Project Setup**: Define your project's core identity
- **Layout Selection**: Choose from 10+ layout patterns
- **Design Style**: Pick from 9 modern design aesthetics
- **Color Theme**: Select or customize your color palette
- **Typography**: Fine-tune fonts and text styling
- **Visual Elements**: Choose icons, illustrations, and imagery
- **Background Effects** ✨: Select from 31 react-bits backgrounds
- **UI Components** ✨: Choose from 37 react-bits components
- **Functionality**: Select feature tiers and technical requirements
- **Animations** ✨: Add from 25 react-bits animations
- **Preview**: Review and generate your detailed prompt

✨ = **New React-Bits Integration** - 93 production-ready components!

### 📊 **Live Preview**
Real-time visualization of your selections with:
- Interactive layout previews
- Color theme swatches
- Typography samples
- Progress tracking

### 📝 **Dual Prompt Modes**
- **Detailed Mode**: Comprehensive 10-section prompt with full specifications
- **Basic Mode**: Concise summary for quick iterations

### 💾 **Smart Persistence**
- Auto-save every second
- LocalStorage integration
- Resume from where you left off
- Export/import project configurations (coming soon)

### 🎨 **Beautiful UI**
- Glassmorphism design
- Smooth animations and transitions
- Floating geometric elements
- Dark theme optimized for long sessions

### ⌨️ **Keyboard Shortcuts**
Boost your productivity with powerful keyboard shortcuts:
- `Ctrl/Cmd + →` - Navigate to next step
- `Ctrl/Cmd + ←` - Navigate to previous step
- `Ctrl/Cmd + G` - Generate prompt
- `Esc` - Close modal dialogs
- `Tab` - Navigate between interactive elements
- `Enter` - Select focused option

### 🔍 **Search & Filter**
Quickly find what you need across 93 react-bits components:
- Real-time search across titles and descriptions
- Tag-based filtering for precise results
- Combined search and tag filters
- Live result count display
- Instant filtering with no lag

### ↩️ **Undo/Redo**
Experiment freely with full history management:
- Undo recent selections (`Ctrl/Cmd + Z`)
- Redo undone actions (`Ctrl/Cmd + Shift + Z`)
- Visual indicators for available history
- Automatic state tracking
- Debounced history updates for performance

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lovabolt.git
   cd lovabolt
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

The optimized build will be in the `dist` folder.

---

## 💻 Usage

### Quick Start Guide

1. **Launch LovaBolt** and click "Get Started"
2. **Fill in Project Details**: Name, description, type, and purpose
3. **Select Layout**: Choose primary layout and special features
4. **Pick Design Style**: Select from Material, Glassmorphism, Minimalist, etc.
5. **Choose Colors**: Use preset themes or create custom palette
6. **Configure Typography**: Select fonts and text styling
7. **Add Visuals**: Choose icon styles, illustrations, and imagery
8. **Select Background** ✨: Pick from 31 stunning background effects
9. **Choose Components** ✨: Select from 37 UI components
10. **Select Functionality**: Pick feature tier and technical requirements
11. **Enable Animations** ✨: Add from 25 animation effects
12. **Generate Prompt**: Review and copy your detailed prompt

✨ = **New React-Bits Integration** - Professional components with installation commands!

### Using Generated Prompts

#### With Bolt.new
1. Click "Copy & Go to Bolt" button
2. Paste the prompt in Bolt.new's input
3. Watch your website come to life!

#### With Lovable.dev
1. Click "Copy & Go to Lovable" button
2. Paste the prompt in Lovable.dev's interface
3. Let AI build your vision!

### Power User Tips

#### Using Keyboard Shortcuts
- Navigate quickly: Use `Ctrl/Cmd + →` and `Ctrl/Cmd + ←` to move between steps
- Generate instantly: Press `Ctrl/Cmd + G` from any step to generate your prompt
- Close modals: Hit `Esc` to quickly close detail views

#### Using Search & Filter
- Find components fast: Type keywords in the search box on Background, Components, or Animations steps
- Filter by tags: Click tag badges to filter by category (e.g., "3D", "Interactive", "Gradient")
- Combine filters: Use search + tags together for precise results
- Clear filters: Click "Clear" or remove all tags to see all options

#### Using Undo/Redo
- Experiment freely: Try different selections knowing you can undo
- Undo mistakes: Press `Ctrl/Cmd + Z` or click the Undo button
- Redo changes: Press `Ctrl/Cmd + Shift + Z` or click the Redo button
- Visual feedback: Buttons show when history is available

---

## 🛠️ Tech Stack

### Core Technologies
- **React 18.3** - UI library
- **TypeScript 5.5** - Type safety
- **Vite 5.4** - Build tool and dev server
- **React Router 7.9** - Client-side routing

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Class Variance Authority** - Component variants

### State Management
- **React Context API** - Global state
- **LocalStorage** - Persistence layer

### Form & Validation
- **React Hook Form 7.53** - Form management
- **Zod 3.23** - Schema validation

---

## 📁 Project Structure

```
lovabolt/
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   └── ReactBitsCard.tsx      # ✨ Reusable react-bits card
│   │   ├── layout/         # Layout components (Header, Sidebar, etc.)
│   │   ├── modals/
│   │   │   └── ReactBitsModal.tsx     # ✨ React-bits detail modal
│   │   ├── steps/
│   │   │   ├── BackgroundStep.tsx     # ✨ NEW: Background selection
│   │   │   ├── ComponentsStep.tsx     # ✨ NEW: Component selection
│   │   │   ├── AnimationsStep.tsx     # ✨ UPDATED: React-bits animations
│   │   │   └── ...                    # Other wizard steps
│   │   ├── ui/             # shadcn/ui components
│   │   ├── ErrorBoundary.tsx
│   │   ├── StepErrorFallback.tsx      # ✨ Error fallback component
│   │   ├── WelcomePage.tsx
│   │   └── WizardLayout.tsx
│   ├── contexts/
│   │   └── BoltBuilderContext.tsx     # Global state (updated with react-bits)
│   ├── data/
│   │   ├── reactBitsData.ts           # ✨ NEW: 93 react-bits components
│   │   └── wizardData.ts              # Static data (layouts, styles, etc.)
│   ├── hooks/
│   │   └── use-toast.ts    # Toast notifications
│   ├── lib/
│   │   └── utils.ts        # Utility functions
│   ├── types/
│   │   └── index.ts        # TypeScript types (updated with react-bits)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .kiro/
│   └── specs/
│       └── react-bits-integration/    # ✨ Integration spec documents
├── public/
├── REACT_BITS_INTEGRATION.md          # ✨ NEW: Comprehensive documentation
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── README.md
└── ROADMAP.md

✨ = New or updated for React-Bits integration
```

---

## 🐛 Known Issues

All critical bugs have been fixed in the latest version:
- ✅ Button component import issues resolved
- ✅ useEffect dependency warnings fixed
- ✅ Memory leaks in animations patched
- ✅ Error boundary added for crash protection

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Build Errors

**Problem**: TypeScript compilation errors
```bash
npm run build
# Error: Type 'X' is not assignable to type 'Y'
```

**Solution**: 
1. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
2. Clear TypeScript cache: `rm -rf tsconfig.tsbuildinfo`
3. Verify TypeScript version: `npm list typescript`

**Problem**: Module not found errors
```bash
Error: Cannot find module '@/components/...'
```

**Solution**: 
1. Check `tsconfig.json` paths configuration
2. Restart development server: `npm run dev`
3. Verify file exists at the specified path

#### Runtime Errors

**Problem**: LocalStorage data corrupted
```
Error: Unexpected token in JSON at position 0
```

**Solution**:
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Delete `lovabolt-project` key
4. Refresh the page

**Problem**: Component not rendering
```
Error: Cannot read property 'map' of undefined
```

**Solution**:
1. Check if data is loaded in BoltBuilderContext
2. Verify component receives correct props
3. Check browser console for additional errors

#### Performance Issues

**Problem**: Slow initial load

**Solution**:
1. Clear browser cache
2. Check network tab for slow requests
3. Verify bundle size: `npm run build` and check `dist/` folder
4. Disable browser extensions temporarily

**Problem**: Laggy animations

**Solution**:
1. Reduce number of selected components
2. Close other browser tabs
3. Check CPU usage in DevTools Performance tab
4. Disable hardware acceleration if needed

#### Search & Filter Issues

**Problem**: Search not working

**Solution**:
1. Verify search input has focus
2. Check console for JavaScript errors
3. Clear search query and try again
4. Refresh the page

**Problem**: No results found

**Solution**:
1. Check spelling in search query
2. Clear tag filters
3. Try broader search terms
4. Verify data is loaded correctly

#### Keyboard Shortcuts Not Working

**Problem**: Shortcuts don't respond

**Solution**:
1. Ensure no input field has focus
2. Check if modal is open (Esc to close)
3. Verify browser doesn't override shortcuts
4. Try clicking on the page first

#### Undo/Redo Issues

**Problem**: Undo button disabled

**Solution**:
1. Make at least one selection first
2. Wait for debounce period (500ms)
3. Check if history is cleared
4. Refresh page if issue persists

### Getting Help

If you encounter issues not listed here:

1. Check [GitHub Issues](https://github.com/yourusername/lovabolt/issues) for similar problems
2. Search [GitHub Discussions](https://github.com/yourusername/lovabolt/discussions)
3. Create a new issue with:
   - Browser and version
   - Steps to reproduce
   - Error messages
   - Screenshots if applicable

---

## 📊 Performance Metrics

LovaBolt is optimized for speed and efficiency:

### Bundle Size
- **Initial Bundle**: <500KB gzipped
- **Lazy-loaded Chunks**: 50-150KB per step
- **Vendor Chunks**: Cached separately for faster reloads
- **Total Size**: ~2.5MB uncompressed (optimized with code splitting)

### Load Times
- **First Contentful Paint**: <2 seconds
- **Time to Interactive**: <3 seconds
- **Largest Contentful Paint**: <2.5 seconds
- **Cumulative Layout Shift**: <0.1

### Lighthouse Scores
- **Performance**: 90+ (desktop), 85+ (mobile)
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

### Optimization Techniques
- ✅ Code splitting with React.lazy()
- ✅ Manual chunk configuration for vendors
- ✅ Tree-shaking for unused code
- ✅ Terser minification in production
- ✅ Debounced LocalStorage saves
- ✅ Memoized components and callbacks
- ✅ Optimized re-renders with React.memo
- ✅ Lazy loading of wizard steps

### Browser Support
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

### Performance Tips
1. Use Chrome DevTools Lighthouse for audits
2. Monitor bundle size with `npm run build`
3. Check Network tab for slow requests
4. Use React DevTools Profiler for component performance
5. Test on slower devices and networks

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Bolt.new](https://bolt.new) - AI-powered web development
- [Lovable.dev](https://lovable.dev) - AI website builder
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

---

## 📞 Support

- 📧 Email: hello@lovabolt.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/lovabolt/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/lovabolt/discussions)

---

## 📚 Documentation

- **[React-Bits Integration Guide](REACT_BITS_INTEGRATION.md)** - Complete documentation for the 93-component integration
- **[Roadmap](ROADMAP.md)** - Planned features and improvements
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to the project

### React-Bits Integration

LovaBolt now includes 93 production-ready React components from [React-Bits](https://reactbits.dev):

- **31 Backgrounds**: Aurora, Particles, Meteors, Globe, and more
- **37 UI Components**: Carousel, Cards, Timeline, Modals, and more  
- **25 Animations**: Blob Cursor, Magnetic Button, Scroll Reveal, and more

Each component includes:
- ✅ Installation command (npx shadcn)
- ✅ Dependencies list
- ✅ Usage examples
- ✅ Detailed descriptions

See [REACT_BITS_INTEGRATION.md](REACT_BITS_INTEGRATION.md) for complete documentation.

## 🗺️ Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features and improvements.

---

<div align="center">

**Made with ❤️ by the LovaBolt Team**

⭐ Star us on GitHub if you find this helpful!

</div>
