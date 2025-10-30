# MCP Task Configuration for React-Bits Integration

## Overview

This guide provides specific instructions for using Model Context Protocol (MCP) tools during the implementation and testing of the react-bits integration feature. MCP tools enable automated browser testing, visual validation, and debugging without manual intervention.

## Available MCP Tools

### Playwright MCP

Primary tool for E2E testing and browser automation. Use for:
- Navigating through wizard steps
- Clicking and interacting with UI elements
- Filling forms and selecting options
- Taking screenshots for visual validation
- Verifying text content and element presence

### Chrome DevTools MCP

Advanced tool for debugging and performance analysis. Use for:
- Taking detailed page snapshots
- Inspecting console logs and network requests
- Performance profiling
- Accessibility tree inspection

## Task-Specific MCP Usage

### Task 4: BackgroundStep Component Testing

**After implementing BackgroundStep, validate with:**

```typescript
// 1. Navigate to the application
mcp_playwright_playwright_navigate({
  url: "http://localhost:5173",
  browserType: "chromium",
  headless: false
});

// 2. Navigate to Background step (assuming you're starting from home)
mcp_playwright_playwright_click({
  selector: "[data-step='background']" // or appropriate selector
});

// 3. Take screenshot of initial state
mcp_playwright_playwright_screenshot({
  name: "background-step-initial",
  savePng: true,
  fullPage: true
});

// 4. Click on a background option (e.g., Aurora)
mcp_playwright_playwright_click({
  selector: "[data-option-id='aurora']" // adjust based on actual implementation
});

// 5. Verify CLI command is displayed
mcp_playwright_playwright_get_visible_text();
// Look for: "npx shadcn@latest add"

// 6. Take screenshot of selected state
mcp_playwright_playwright_screenshot({
  name: "background-step-selected",
  savePng: true,
  fullPage: true
});

// 7. Click "View Details" button
mcp_playwright_playwright_click({
  selector: "button:has-text('View Details')"
});

// 8. Verify modal opened
mcp_playwright_playwright_screenshot({
  name: "background-modal-open",
  savePng: true
});

// 9. Close modal (Escape key)
mcp_playwright_playwright_press_key({
  key: "Escape"
});

// 10. Navigate to next step
mcp_playwright_playwright_click({
  selector: "button:has-text('Continue to Components')"
});
```

### Task 5: ComponentsStep Component Testing

**After implementing ComponentsStep, validate with:**

```typescript
// 1. Ensure you're on Components step
mcp_playwright_playwright_navigate({
  url: "http://localhost:5173/#/components" // adjust based on routing
});

// 2. Take initial screenshot
mcp_playwright_playwright_screenshot({
  name: "components-step-initial",
  savePng: true,
  fullPage: true
});

// 3. Select first component (e.g., Carousel)
mcp_playwright_playwright_click({
  selector: "[data-option-id='carousel']"
});

// 4. Select second component (e.g., Accordion)
mcp_playwright_playwright_click({
  selector: "[data-option-id='accordion']"
});

// 5. Verify count display shows "2 selected"
mcp_playwright_playwright_get_visible_text();
// Look for: "2 selected"

// 6. Take screenshot with selections
mcp_playwright_playwright_screenshot({
  name: "components-step-multiple-selected",
  savePng: true,
  fullPage: true
});

// 7. Verify CLI commands are displayed
// Should see multiple CLI commands listed

// 8. Deselect one component
mcp_playwright_playwright_click({
  selector: "[data-option-id='carousel']"
});

// 9. Verify count updated to "1 selected"
mcp_playwright_playwright_get_visible_text();
```

### Task 6: AnimationsStep Update Testing

**After updating AnimationsStep, validate with:**

```typescript
// 1. Navigate to Animations step
mcp_playwright_playwright_navigate({
  url: "http://localhost:5173/#/animations"
});

// 2. Take screenshot
mcp_playwright_playwright_screenshot({
  name: "animations-step-updated",
  savePng: true,
  fullPage: true
});

// 3. Select animation (e.g., Blob Cursor)
mcp_playwright_playwright_click({
  selector: "[data-option-id='blob-cursor']"
});

// 4. Verify CLI command displayed
mcp_playwright_playwright_get_visible_text();
// Look for: "npx shadcn@latest add"

// 5. Open modal
mcp_playwright_playwright_click({
  selector: "button:has-text('View Details')"
});

// 6. Screenshot modal
mcp_playwright_playwright_screenshot({
  name: "animation-modal",
  savePng: true
});
```

### Task 9: Prompt Generation Testing

**After implementing prompt generation, validate with:**

```typescript
// 1. Complete wizard flow with selections
// (Navigate through all steps making selections)

// 2. Navigate to Preview step
mcp_playwright_playwright_navigate({
  url: "http://localhost:5173/#/preview"
});

// 3. Get visible text to verify prompt content
const promptText = await mcp_playwright_playwright_get_visible_text();

// 4. Verify sections exist:
// - "## 7. Background Effect"
// - "## 8. UI Components"
// - "## 9. UI/UX Animations"
// - "## 12. React-Bits Installation"

// 5. Take screenshot of generated prompt
mcp_playwright_playwright_screenshot({
  name: "prompt-with-react-bits",
  savePng: true,
  fullPage: true
});

// 6. Test copy functionality
mcp_playwright_playwright_click({
  selector: "button:has-text('Copy')"
});

// 7. Verify copied notification
mcp_playwright_playwright_get_visible_text();
// Look for: "Copied" or success message
```

### Task 15: Integration Testing

**Complete wizard flow test:**

```typescript
// 1. Start fresh
mcp_playwright_playwright_navigate({
  url: "http://localhost:5173",
  browserType: "chromium",
  headless: false
});

// 2. Clear localStorage
mcp_playwright_playwright_evaluate({
  script: "() => { localStorage.clear(); }"
});

// 3. Reload page
mcp_playwright_playwright_navigate({
  url: "http://localhost:5173"
});

// 4. Fill Project Setup
mcp_playwright_playwright_fill({
  selector: "input[name='projectName']",
  value: "Test Project"
});

mcp_playwright_playwright_fill({
  selector: "textarea[name='description']",
  value: "Testing react-bits integration"
});

mcp_playwright_playwright_click({
  selector: "button:has-text('Continue')"
});

// 5. Navigate through steps (Layout, Design, Color, Typography, Visuals)
// Click continue on each...

// 6. Background Step
mcp_playwright_playwright_click({
  selector: "[data-option-id='aurora']"
});

mcp_playwright_playwright_screenshot({
  name: "integration-background-selected",
  savePng: true
});

mcp_playwright_playwright_click({
  selector: "button:has-text('Continue to Components')"
});

// 7. Components Step
mcp_playwright_playwright_click({
  selector: "[data-option-id='carousel']"
});

mcp_playwright_playwright_click({
  selector: "[data-option-id='accordion']"
});

mcp_playwright_playwright_screenshot({
  name: "integration-components-selected",
  savePng: true
});

mcp_playwright_playwright_click({
  selector: "button:has-text('Continue to Functionality')"
});

// 8. Continue through Functionality

// 9. Animations Step
mcp_playwright_playwright_click({
  selector: "[data-option-id='blob-cursor']"
});

mcp_playwright_playwright_screenshot({
  name: "integration-animations-selected",
  savePng: true
});

mcp_playwright_playwright_click({
  selector: "button:has-text('Continue to Preview')"
});

// 10. Verify Preview
mcp_playwright_playwright_screenshot({
  name: "integration-final-preview",
  savePng: true,
  fullPage: true
});

// 11. Verify localStorage persistence
const savedData = await mcp_playwright_playwright_evaluate({
  script: "() => { return localStorage.getItem('lovabolt-project'); }"
});

// Parse and verify selectedBackground, selectedComponents, selectedAnimations exist
```

### Task 16: E2E Testing with Playwright

**Comprehensive test suite:**

```typescript
// Test 1: Keyboard Navigation
mcp_playwright_playwright_navigate({
  url: "http://localhost:5173/#/background"
});

// Tab through cards
mcp_playwright_playwright_press_key({ key: "Tab" });
mcp_playwright_playwright_press_key({ key: "Tab" });

// Select with Enter
mcp_playwright_playwright_press_key({ key: "Enter" });

// Verify selection
mcp_playwright_playwright_screenshot({
  name: "keyboard-navigation-test",
  savePng: true
});

// Test 2: Modal Interactions
mcp_playwright_playwright_click({
  selector: "button:has-text('View Details')"
});

// Copy CLI command
mcp_playwright_playwright_click({
  selector: "button:has-text('Copy')"
});

// Close with Escape
mcp_playwright_playwright_press_key({ key: "Escape" });

// Test 3: Responsive Design
// Desktop
mcp_playwright_playwright_navigate({
  url: "http://localhost:5173/#/components",
  width: 1920,
  height: 1080
});

mcp_playwright_playwright_screenshot({
  name: "responsive-desktop",
  savePng: true,
  fullPage: true
});

// Tablet
mcp_playwright_playwright_navigate({
  url: "http://localhost:5173/#/components",
  width: 768,
  height: 1024
});

mcp_playwright_playwright_screenshot({
  name: "responsive-tablet",
  savePng: true,
  fullPage: true
});

// Mobile
mcp_playwright_playwright_navigate({
  url: "http://localhost:5173/#/components",
  width: 375,
  height: 667
});

mcp_playwright_playwright_screenshot({
  name: "responsive-mobile",
  savePng: true,
  fullPage: true
});

// Test 4: Error Handling
// Corrupt localStorage
mcp_playwright_playwright_evaluate({
  script: "() => { localStorage.setItem('lovabolt-project', 'invalid json'); }"
});

mcp_playwright_playwright_navigate({
  url: "http://localhost:5173"
});

// Verify app doesn't crash
mcp_playwright_playwright_get_visible_text();

mcp_playwright_playwright_screenshot({
  name: "error-handling-corrupted-storage",
  savePng: true
});
```

## Chrome DevTools MCP Usage

### Accessibility Testing

```typescript
// 1. Navigate to step
mcp_chrome_devtools_navigate_page({
  url: "http://localhost:5173/#/background"
});

// 2. Take accessibility snapshot
mcp_chrome_devtools_take_snapshot({
  verbose: true
});

// This will show the accessibility tree
// Verify:
// - All cards have proper roles
// - Selection state is announced
// - Focus indicators are present

// 3. Check console for accessibility warnings
mcp_chrome_devtools_list_console_messages({
  types: ["error", "warn"]
});
```

### Performance Testing

```typescript
// 1. Start performance trace
mcp_chrome_devtools_performance_start_trace({
  reload: true,
  autoStop: false
});

// 2. Interact with page
mcp_chrome_devtools_click({
  uid: "background-card-1" // from snapshot
});

mcp_chrome_devtools_click({
  uid: "background-card-2"
});

// 3. Stop trace
mcp_chrome_devtools_performance_stop_trace();

// Review insights for performance issues
// Look for:
// - Long tasks
// - Layout shifts
// - Render blocking
```

### Network Request Monitoring

```typescript
// 1. Navigate and monitor
mcp_chrome_devtools_navigate_page({
  url: "http://localhost:5173"
});

// 2. List network requests
mcp_chrome_devtools_list_network_requests({
  resourceTypes: ["script", "stylesheet", "fetch"]
});

// Verify:
// - No unnecessary requests
// - Assets load efficiently
// - No 404 errors
```

## Best Practices

### When to Use Playwright vs Chrome DevTools

**Use Playwright for:**
- User interaction testing (clicks, typing, navigation)
- Visual regression testing (screenshots)
- E2E workflow validation
- Cross-browser testing

**Use Chrome DevTools for:**
- Debugging specific issues
- Performance profiling
- Accessibility audits
- Console log inspection
- Network request analysis

### Screenshot Strategy

1. **Initial State**: Capture before any interaction
2. **Selected State**: Capture after selection
3. **Modal State**: Capture when modal is open
4. **Error State**: Capture when errors occur
5. **Responsive States**: Capture at different viewport sizes

### Test Data Management

```typescript
// Use consistent test data
const testSelections = {
  background: 'aurora',
  components: ['carousel', 'accordion', 'tabs'],
  animations: ['blob-cursor', 'magnetic-button']
};

// Clear state between tests
mcp_playwright_playwright_evaluate({
  script: "() => { localStorage.clear(); sessionStorage.clear(); }"
});
```

### Error Detection

```typescript
// Check console for errors after each major action
mcp_playwright_playwright_console_logs({
  type: "error",
  clear: false
});

// Verify no React errors
mcp_playwright_playwright_get_visible_text();
// Should NOT contain: "Error", "Failed", "undefined"
```

## Debugging Failed Tests

### Common Issues and Solutions

**Issue: Element not found**
```typescript
// Solution: Wait for element
mcp_playwright_playwright_wait_for({
  text: "Background Effects",
  timeout: 5000
});
```

**Issue: Click not working**
```typescript
// Solution: Hover first, then click
mcp_playwright_playwright_hover({
  selector: "[data-option-id='aurora']"
});

mcp_playwright_playwright_click({
  selector: "[data-option-id='aurora']"
});
```

**Issue: Modal not closing**
```typescript
// Solution: Use multiple close methods
mcp_playwright_playwright_press_key({ key: "Escape" });
// OR
mcp_playwright_playwright_click({
  selector: "button[aria-label='Close']"
});
```

**Issue: Screenshot shows loading state**
```typescript
// Solution: Wait for content
mcp_playwright_playwright_wait_for({
  text: "Background Effects",
  timeout: 5000
});

// Then take screenshot
mcp_playwright_playwright_screenshot({
  name: "after-load",
  savePng: true
});
```

## Test Execution Workflow

### For Each Task Implementation:

1. **Implement the feature**
2. **Start dev server** (manually: `npm run dev`)
3. **Run basic Playwright tests** to verify functionality
4. **Take screenshots** for visual validation
5. **Run Chrome DevTools tests** for performance/accessibility
6. **Review console logs** for errors
7. **Test responsive layouts**
8. **Document any issues found**

### Complete Integration Test:

1. Clear all state
2. Navigate through entire wizard
3. Make selections at each step
4. Verify state persistence
5. Check prompt generation
6. Test save/load functionality
7. Verify no console errors
8. Take comprehensive screenshots

## MCP Tool Configuration

### Playwright Configuration

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"],
      "disabled": false,
      "autoApprove": [
        "playwright_navigate",
        "playwright_screenshot",
        "playwright_click",
        "playwright_fill",
        "playwright_get_visible_text"
      ]
    }
  }
}
```

### Chrome DevTools Configuration

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-chrome-devtools"],
      "disabled": false,
      "autoApprove": [
        "take_snapshot",
        "list_console_messages",
        "take_screenshot"
      ]
    }
  }
}
```

## Validation Checklist

After implementing each task, use MCP tools to verify:

- [ ] Component renders without errors
- [ ] Selection state updates correctly
- [ ] Visual styling matches design system
- [ ] Modal opens and closes properly
- [ ] CLI commands display correctly
- [ ] Navigation works forward and backward
- [ ] State persists across navigation
- [ ] Responsive layout works on all viewports
- [ ] Keyboard navigation functions
- [ ] No console errors or warnings
- [ ] Accessibility tree is correct
- [ ] Performance is acceptable

## Documentation

Save all screenshots to a `test-results/` directory with descriptive names:
- `{task-number}-{component}-{state}.png`
- Example: `04-background-step-selected.png`

This creates a visual record of implementation progress and helps identify regressions.
