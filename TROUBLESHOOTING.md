# Troubleshooting: Dynamic Import Error

## Issue
After implementing code splitting, you may see this error:
```
TypeError: Failed to fetch dynamically imported module: 
http://localhost:5173/src/components/steps/ProjectSetupStep.tsx
```

## Root Cause
Vite's dev server needs to be restarted after implementing React.lazy() code splitting changes. The HMR (Hot Module Replacement) doesn't always handle the transition from static to dynamic imports smoothly.

## Solution

### Quick Fix (Recommended)
1. **Stop the dev server** (if running): Press `Ctrl+C` in the terminal
2. **Clear Vite cache**: 
   ```bash
   rm -rf node_modules/.vite
   ```
   Or on Windows:
   ```powershell
   Remove-Item -Recurse -Force node_modules/.vite
   ```
3. **Restart dev server**:
   ```bash
   npm run dev
   ```

### Alternative: Hard Refresh
If the server is already running:
1. In your browser, press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. This performs a hard refresh and clears the browser cache

### If Issue Persists

1. **Clear browser cache completely**:
   - Chrome: DevTools → Network tab → Check "Disable cache"
   - Or use Incognito/Private mode

2. **Verify all step components export default**:
   ```typescript
   // Each step component should end with:
   export default ComponentName;
   ```

3. **Check for circular dependencies**:
   - Make sure no step components import each other
   - Context imports should be one-way

4. **Rebuild from scratch**:
   ```bash
   # Stop dev server
   # Clear all caches
   rm -rf node_modules/.vite
   rm -rf dist
   
   # Reinstall dependencies (optional, if needed)
   npm install
   
   # Start fresh
   npm run dev
   ```

## Verification

After restarting, you should see:
1. Dev server starts successfully
2. Navigate to http://localhost:5173
3. Click through wizard steps - each should load smoothly
4. Check browser DevTools Network tab - you'll see step components loading on-demand

## Expected Behavior

With code splitting working correctly:
- Initial page load is faster
- Each step component loads only when navigated to
- In Network tab, you'll see files like:
  - `ProjectSetupStep.tsx`
  - `LayoutStep.tsx`
  - etc. loading as you navigate

## Production Build

The production build should work fine:
```bash
npm run build
npm run preview
```

If production works but dev doesn't, it's definitely a Vite cache issue.

## Prevention

To avoid this in the future:
- Restart dev server after major structural changes
- Clear Vite cache periodically: `rm -rf node_modules/.vite`
- Use `npm run dev -- --force` to force Vite to rebuild

## Still Having Issues?

If none of the above works:

1. **Check Vite version**:
   ```bash
   npm list vite
   ```
   Should be 5.4.8 or higher

2. **Check for TypeScript errors**:
   ```bash
   npm run build
   ```
   This will show any compilation errors

3. **Verify file structure**:
   - All step files should be in `src/components/steps/`
   - All should have `.tsx` extension
   - All should export default

4. **Check console for detailed errors**:
   - Open browser DevTools (F12)
   - Check Console tab for stack traces
   - Check Network tab for failed requests

## Quick Commands Reference

```bash
# Stop dev server
Ctrl+C

# Clear Vite cache (Windows PowerShell)
Remove-Item -Recurse -Force node_modules/.vite

# Clear Vite cache (Unix/Mac/Git Bash)
rm -rf node_modules/.vite

# Start dev server
npm run dev

# Force rebuild
npm run dev -- --force

# Build for production
npm run build

# Preview production build
npm run preview
```

## Success Indicators

✅ Dev server starts without errors
✅ Can navigate to all wizard steps
✅ Browser console shows no errors
✅ Network tab shows lazy-loaded chunks
✅ Production build completes successfully

---

**Note**: This is a one-time issue that occurs when transitioning from static to dynamic imports. Once the dev server is restarted with cleared cache, everything should work smoothly.
