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
Step-by-step guidance through 8 comprehensive sections:
- **Project Setup**: Define your project's core identity
- **Layout Selection**: Choose from 10+ layout patterns
- **Design Style**: Pick from 9 modern design aesthetics
- **Color Theme**: Select or customize your color palette
- **Typography**: Fine-tune fonts and text styling
- **Visual Elements**: Choose icons, illustrations, and imagery
- **Functionality**: Select feature tiers and technical requirements
- **Animations**: Add UI/UX micro-interactions

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
8. **Select Functionality**: Pick feature tier and technical requirements
9. **Enable Animations**: Add micro-interactions and transitions
10. **Generate Prompt**: Review and copy your detailed prompt

### Using Generated Prompts

#### With Bolt.new
1. Click "Copy & Go to Bolt" button
2. Paste the prompt in Bolt.new's input
3. Watch your website come to life!

#### With Lovable.dev
1. Click "Copy & Go to Lovable" button
2. Paste the prompt in Lovable.dev's interface
3. Let AI build your vision!

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
│   │   ├── cards/          # Reusable card components
│   │   ├── layout/         # Layout components (Header, Sidebar, etc.)
│   │   ├── modals/         # Modal dialogs
│   │   ├── steps/          # Wizard step components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── ErrorBoundary.tsx
│   │   ├── WelcomePage.tsx
│   │   └── WizardLayout.tsx
│   ├── contexts/
│   │   └── BoltBuilderContext.tsx  # Global state management
│   ├── data/
│   │   └── wizardData.ts   # Static data (layouts, styles, etc.)
│   ├── hooks/
│   │   └── use-toast.ts    # Toast notifications
│   ├── lib/
│   │   └── utils.ts        # Utility functions
│   ├── types/
│   │   └── index.ts        # TypeScript type definitions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── README.md
└── ROADMAP.md
```

---

## 🐛 Known Issues

All critical bugs have been fixed in the latest version:
- ✅ Button component import issues resolved
- ✅ useEffect dependency warnings fixed
- ✅ Memory leaks in animations patched
- ✅ Error boundary added for crash protection

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

## 🗺️ Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features and improvements.

---

<div align="center">

**Made with ❤️ by the LovaBolt Team**

⭐ Star us on GitHub if you find this helpful!

</div>
