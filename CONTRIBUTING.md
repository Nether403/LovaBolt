# 🤝 Contributing to LovaBolt

First off, thank you for considering contributing to LovaBolt! It's people like you that make LovaBolt such a great tool.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Pledge
- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Git
- A GitHub account
- Basic knowledge of React and TypeScript

### First Contribution?
Look for issues labeled:
- `good first issue` - Easy issues for beginners
- `help wanted` - Issues where we need help
- `documentation` - Documentation improvements

---

## 💡 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

**Required Information:**
- Clear, descriptive title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, version)

**Template:**
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.1]
```

### 💡 Suggesting Features

Feature suggestions are welcome! Please:

1. Check if the feature is already suggested
2. Provide a clear use case
3. Explain why it would be useful
4. Consider implementation complexity

**Template:**
```markdown
**Feature Description**
Clear description of the feature.

**Use Case**
Why would this be useful?

**Proposed Solution**
How might this work?

**Alternatives Considered**
What other solutions did you consider?
```

### 📝 Improving Documentation

Documentation improvements are always welcome:
- Fix typos or unclear wording
- Add examples
- Improve explanations
- Translate to other languages

### 💻 Contributing Code

See [Development Setup](#development-setup) below.

---

## 🛠️ Development Setup

### 1. Fork and Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/lovabolt.git
cd lovabolt
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Make Your Changes

- Write clean, readable code
- Follow our coding guidelines
- Add comments where necessary
- Update documentation if needed

### 6. Test Your Changes

```bash
# Run linter
npm run lint

# Build to check for errors
npm run build

# Manual testing
# Test all affected features thoroughly
```

### 7. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing feature"
```

See [Commit Messages](#commit-messages) for guidelines.

### 8. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## 📐 Coding Guidelines

### TypeScript

```typescript
// ✅ DO: Use explicit types
interface UserProps {
  name: string;
  age: number;
}

// ❌ DON'T: Use 'any'
const user: any = { name: 'John' };

// ✅ DO: Use proper typing
const user: UserProps = { name: 'John', age: 30 };
```

### React Components

```typescript
// ✅ DO: Use functional components with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// ✅ DO: Export at the bottom
export default Button;
```

### Naming Conventions

```typescript
// Components: PascalCase
const UserProfile = () => {};

// Functions: camelCase
const handleClick = () => {};

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;

// Interfaces/Types: PascalCase
interface UserData {}
type ButtonVariant = 'primary' | 'secondary';
```

### File Structure

```
src/
├── components/
│   ├── ComponentName/
│   │   ├── ComponentName.tsx
│   │   ├── ComponentName.test.tsx
│   │   └── index.ts
```

### Styling

```typescript
// ✅ DO: Use Tailwind classes
<div className="flex items-center gap-4 p-6 rounded-lg bg-white/10">

// ✅ DO: Use cn() for conditional classes
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>

// ❌ DON'T: Use inline styles unless necessary
<div style={{ color: 'red' }}>
```

### State Management

```typescript
// ✅ DO: Use Context for global state
const { projectInfo, setProjectInfo } = useBoltBuilder();

// ✅ DO: Use useState for local state
const [isOpen, setIsOpen] = useState(false);

// ✅ DO: Use useCallback for functions passed as props
const handleClick = useCallback(() => {
  // logic
}, [dependencies]);
```

### Error Handling

```typescript
// ✅ DO: Handle errors gracefully
try {
  const data = JSON.parse(localStorage.getItem('key'));
} catch (error) {
  console.error('Failed to parse data:', error);
  // Fallback logic
}

// ✅ DO: Provide user feedback
if (error) {
  toast.error('Something went wrong. Please try again.');
}
```

---

## 📝 Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
feat(wizard): add undo/redo functionality

# Bug fix
fix(button): resolve import issue in step components

# Documentation
docs(readme): update installation instructions

# Refactor
refactor(context): split large context into smaller contexts

# Performance
perf(preview): optimize re-render performance
```

### Rules

- Use present tense ("add" not "added")
- Use imperative mood ("move" not "moves")
- Keep subject line under 50 characters
- Capitalize subject line
- No period at the end of subject
- Separate subject from body with blank line
- Wrap body at 72 characters
- Explain what and why, not how

---

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows our style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Tested on multiple browsers
- [ ] Responsive design verified

### PR Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots
If applicable, add screenshots.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tested thoroughly
```

### Review Process

1. **Automated Checks**: CI/CD runs automatically
2. **Code Review**: Maintainer reviews your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, PR will be merged
5. **Celebration**: You're a contributor! 🎉

### After Merge

- Your contribution will be in the next release
- You'll be added to contributors list
- Thank you for making LovaBolt better!

---

## 🏗️ Project Structure

```
lovabolt/
├── src/
│   ├── components/       # React components
│   │   ├── cards/       # Card components
│   │   ├── layout/      # Layout components
│   │   ├── modals/      # Modal dialogs
│   │   ├── steps/       # Wizard steps
│   │   └── ui/          # UI primitives
│   ├── contexts/        # React contexts
│   ├── data/            # Static data
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities
│   └── types/           # TypeScript types
├── public/              # Static assets
├── docs/                # Documentation
└── tests/               # Test files
```

---

## 🧪 Testing Guidelines

### Manual Testing Checklist

- [ ] All wizard steps work
- [ ] Navigation works correctly
- [ ] Auto-save functions properly
- [ ] Prompt generation works
- [ ] Copy to clipboard works
- [ ] Preview panel updates
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Accessibility (keyboard navigation)

### Future: Automated Tests

We're working on adding:
- Unit tests (Jest + React Testing Library)
- E2E tests (Playwright)
- Visual regression tests

---

## 🎨 Design Guidelines

### Colors
- Use Tailwind color palette
- Maintain contrast ratios (WCAG AA)
- Dark theme optimized

### Typography
- Headings: Bold, clear hierarchy
- Body: Readable, appropriate line height
- Code: Monospace font

### Spacing
- Use Tailwind spacing scale
- Consistent padding/margins
- Adequate white space

### Animations
- Smooth transitions (200-300ms)
- Purposeful, not distracting
- Respect prefers-reduced-motion

---

## 📚 Resources

### Learning
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Tools
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind Play](https://play.tailwindcss.com/)

---

## 💬 Community

### Communication Channels
- 📧 Email: hello@lovabolt.com
- 🐛 GitHub Issues: Bug reports and features
- 💬 GitHub Discussions: Questions and ideas
- 🐦 Twitter: @lovabolt (coming soon)
- 💬 Discord: Join our server (coming soon)

### Getting Help
- Check existing issues and discussions
- Read the documentation
- Ask in discussions
- Email us if needed

---

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation
- Part of our community

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Thank You!

Every contribution, no matter how small, makes a difference. Thank you for helping make LovaBolt better!

**Happy Contributing! 🚀**
