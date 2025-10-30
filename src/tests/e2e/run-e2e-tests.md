# E2E Test Execution Guide

This guide provides step-by-step instructions for running the E2E tests using Playwright MCP tools.

## Prerequisites

1. **Development Server Running**
   ```bash
   npm run dev
   ```
   Server should be accessible at http://localhost:5173

2. **Playwright MCP Server Configured**
   - Ensure Playwright MCP is installed and configured in `.kiro/settings/mcp.json`
   - Server should be running and connected

3. **Clean State**
   - Clear browser cache and localStorage before starting tests
   - Close any existing browser instances

## Test Execution Order

Run tests in the following order for best results:

### Test 1: BackgroundStep Navigation and Selection

**Purpose**: Validate BackgroundStep functionality

**MCP Commands**:

```typescript
// 1. Navigate to application
mcp_playwright_playwright_navigate({
  url: "http://localhost:5173",
  browserType: "chromium",
  headless: false
});

// 2. Click Background step in sidebar
mcp_playwright_playwright_click({
  selector: "text=Background"
});

// 3. Take initial screenshot
mcp_playwright_playwright_screenshot({
  name: "background-step-initial",
  savePng: true,
  fullPage: true
});

// 4. Verify header is visible
mcp_playwright_playwright_get_visible_text();
// Look for: "Background Effects"

// 5. Select Aurora background
mcp_playwright_playwright_click({
  selector: "text=Aur