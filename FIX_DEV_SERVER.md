# Quick Fix: Restart Dev Server

## The Problem
You're seeing: `TypeError: Failed to fetch dynamically imported module`

This happens because Vite's dev server needs to be restarted after implementing code splitting.

## The Solution (3 Steps)

### Step 1: Clear Vite Cache
Run this command in your terminal:

**Windows PowerShell:**
```powershell
Remove-Item -Recurse -Force node_modules\.vite
```

**Windows CMD:**
```cmd
rmdir /s /q node_modules\.vite
```

**Git Bash / Unix / Mac:**
```bash
rm -rf node_modules/.vite
```

### Step 2: Start Dev Server
```bash
npm run dev
```

### Step 3: Hard Refresh Browser
Once the server is running:
- Press `Ctrl+Shift+R` (Windows/Linux)
- Or `Cmd+Shift+R` (Mac)

## That's It!

Your app should now work perfectly with code splitting enabled. The wizard steps will load on-demand as you navigate through them.

---

## Why This Happened

When we changed from:
```typescript
import ProjectSetupStep from '../steps/ProjectSetupStep';
```

To:
```typescript
const ProjectSetupStep = React.lazy(() => import('../steps/ProjectSetupStep'));
```

Vite's Hot Module Replacement (HMR) couldn't handle the transition automatically. A fresh start with cleared cache fixes this.

## Verify It's Working

1. Open browser DevTools (F12)
2. Go to Network tab
3. Navigate through wizard steps
4. You should see step components loading on-demand (e.g., `ProjectSetupStep.tsx`, `LayoutStep.tsx`)

This is a **one-time fix**. Once done, everything will work smoothly! 🚀
