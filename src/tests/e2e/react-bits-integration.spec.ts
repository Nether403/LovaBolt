/**
 * End-to-End Tests for React-Bits Integration
 * 
 * This test suite validates the complete react-bits integration including:
 * - BackgroundStep navigation and selection
 * - ComponentsStep navigation and multiple selections
 * - AnimationsStep with react-bits animations
 * - Complete wizard flow with all new steps
 * - Modal interactions (open, close, copy CLI command)
 * - Screenshots for documentation
 * 
 * Prerequisites:
 * - Development server running on http://localhost:5173
 * - Playwright MCP server configured and running
 * 
 * Run these tests using Playwright MCP tools
 */

export const E2E_TEST_CONFIG = {
  baseUrl: 'http://localhost:5173',
  timeout: 30000,
  screenshotDir: 'test-results/screenshots',
};

/**
 * Test 1: BackgroundStep Navigation and Selection
 * 
 * Validates:
 * - Navigation to BackgroundStep
 * - Display of all background options
 * - Single selection behavior
 * - CLI command display
 * - Visual state changes
 */
export const testBackgroundStepNavigation = {
  name: 'BackgroundStep - Navigation and Selection',
  steps: [
    {
      action: 'navigate',
      url: 'http://localhost:5173',
      description: 'Navigate to application home',
    },
    {
      action: 'click',
      selector: '[data-step="background"]',
      description: 'Click on Background step in sidebar',
      fallbackSelector: 'text=Background',
    },
    {
      action: 'screenshot',
      name: 'background-step-initial',
      fullPage: true,
      description: 'Capture initial state of BackgroundStep',
    },
    {
      action: 'verify',
      selector: 'h2:has-text("Background Effects")',
      description: 'Verify BackgroundStep header is visible',
    },
    {
      action: 'click',
      selector: '[data-option-id="aurora"]',
      description: 'Select Aurora background',
      fallbackSelector: 'text=Aurora',
    },
    {
      action: 'screenshot',
      name: 'background-step-aurora-selected',
      fullPage: true,
      description: 'Capture Aurora selected state',
    },
    {
      action: 'verify',
      text: 'Installation Command',
      description: 'Verify CLI command section is displayed',
    },
    {
      action: 'verify',
      text: 'npx shadcn@latest add',
      description: 'Verify CLI command contains npx shadcn',
    },
    {
      action: 'click',
      selector: '[data-option-id="gradient-mesh"]',
      description: 'Select different background (Gradient Mesh)',
      fallbackSelector: 'text=Gradient Mesh',
    },
    {
      action: 'screenshot',
      name: 'background-step-gradient-mesh-selected',
      fullPage: true,
      description: 'Verify single selection (previous selection cleared)',
    },
  ],
};

/**
 * Test 2: ComponentsStep Multiple Selection
 * 
 * Validates:
 * - Navigation to ComponentsStep
 * - Multiple selection behavior
 * - Selection count display
 * - CLI commands list display
 * - Toggle selection (add/remove)
 */
export const testComponentsStepMultipleSelection = {
  name: 'ComponentsStep - Multiple Selection',
  steps: [
    {
      action: 'navigate',
      url: 'http://localhost:5173',
      description: 'Navigate to application home',
    },
    {
      action: 'click',
      selector: '[data-step="components"]',
      description: 'Navigate to Components step',
      fallbackSelector: 'text=Components',
    },
    {
      action: 'screenshot',
      name: 'components-step-initial',
      fullPage: true,
      description: 'Capture initial ComponentsStep state',
    },
    {
      action: 'verify',
      selector: 'h2:has-text("UI Components")',
      description: 'Verify ComponentsStep header',
    },
    {
      action: 'click',
      selector: '[data-option-id="carousel"]',
      description: 'Select Carousel component',
      fallbackSelector: 'text=Carousel',
    },
    {
      action: 'screenshot',
      name: 'components-step-one-selected',
      fullPage: true,
      description: 'Capture state with one component selected',
    },
    {
      action: 'verify',
      text: '1 selected',
      description: 'Verify selection count shows 1',
    },
    {
      action: 'click',
      selector: '[data-option-id="accordion"]',
      description: 'Select Accordion component',
      fallbackSelector: 'text=Accordion',
    },
    {
      action: 'click',
      selector: '[data-option-id="tabs"]',
      description: 'Select Tabs component',
      fallbackSelector: 'text=Tabs',
    },
    {
      action: 'screenshot',
      name: 'components-step-three-selected',
      fullPage: true,
      description: 'Capture state with three components selected',
    },
    {
      action: 'verify',
      text: '3 selected',
      description: 'Verify selection count shows 3',
    },
    {
      action: 'verify',
      text: 'Installation Commands',
      description: 'Verify CLI commands section is displayed',
    },
    {
      action: 'click',
      selector: '[data-option-id="accordion"]',
      description: 'Deselect Accordion component (toggle off)',
    },
    {
      action: 'screenshot',
      name: 'components-step-two-selected',
      fullPage: true,
      description: 'Verify component was deselected',
    },
    {
      action: 'verify',
      text: '2 selected',
      description: 'Verify selection count updated to 2',
    },
  ],
};

/**
 * Test 3: AnimationsStep with React-Bits Animations
 * 
 * Validates:
 * - Navigation to AnimationsStep
 * - Display of react-bits animation options
 * - Multiple selection behavior
 * - CLI commands display
 * - AnimationOption type usage
 */
export const testAnimationsStepReactBits = {
  name: 'AnimationsStep - React-Bits Animations',
  steps: [
    {
      action: 'navigate',
      url: 'http://localhost:5173',
      description: 'Navigate to application home',
    },
    {
      action: 'click',
      selector: '[data-step="animations"]',
      description: 'Navigate to Animations step',
      fallbackSelector: 'text=Animations',
    },
    {
      action: 'screenshot',
      name: 'animations-step-initial',
      fullPage: true,
      description: 'Capture initial AnimationsStep state',
    },
    {
      action: 'verify',
      selector: 'h2:has-text("Animations")',
      description: 'Verify AnimationsStep header',
    },
    {
      action: 'click',
      selector: '[data-option-id="blob-cursor"]',
      description: 'Select Blob Cursor animation',
      fallbackSelector: 'text=Blob Cursor',
    },
    {
      action: 'screenshot',
      name: 'animations-step-blob-cursor-selected',
      fullPage: true,
      description: 'Capture Blob Cursor selected state',
    },
    {
      action: 'click',
      selector: '[data-option-id="magnetic-button"]',
      description: 'Select Magnetic Button animation',
      fallbackSelector: 'text=Magnetic Button',
    },
    {
      action: 'click',
      selector: '[data-option-id="text-reveal"]',
      description: 'Select Text Reveal animation',
      fallbackSelector: 'text=Text Reveal',
    },
    {
      action: 'screenshot',
      name: 'animations-step-multiple-selected',
      fullPage: true,
      description: 'Capture multiple animations selected',
    },
    {
      action: 'verify',
      text: 'Installation Commands',
      description: 'Verify CLI commands section is displayed',
    },
    {
      action: 'verify',
      text: 'npx shadcn@latest add',
      description: 'Verify CLI commands are present',
    },
  ],
};

/**
 * Test 4: Modal Interactions
 * 
 * Validates:
 * - Opening modal via "View Details" button
 * - Modal content display (description, dependencies, CLI command)
 * - Copy CLI command functionality
 * - Closing modal with close button
 * - Closing modal with Escape key
 */
export const testModalInteractions = {
  name: 'Modal Interactions - Open, Close, Copy',
  steps: [
    {
      action: 'navigate',
      url: 'http://localhost:5173',
      description: 'Navigate to application home',
    },
    {
      action: 'click',
      selector: '[data-step="background"]',
      description: 'Navigate to Background step',
      fallbackSelector: 'text=Background',
    },
    {
      action: 'click',
      selector: 'button:has-text("View Details")',
      description: 'Click View Details button on first background card',
    },
    {
      action: 'screenshot',
      name: 'modal-open-background',
      fullPage: false,
      description: 'Capture modal open state',
    },
    {
      action: 'verify',
      text: 'Dependencies',
      description: 'Verify modal shows dependencies section',
    },
    {
      action: 'verify',
      text: 'Installation Command',
      description: 'Verify modal shows installation command',
    },
    {
      action: 'click',
      selector: 'button:has-text("Copy")',
      description: 'Click Copy button for CLI command',
    },
    {
      action: 'wait',
      duration: 500,
      description: 'Wait for copy feedback',
    },
    {
      action: 'verify',
      text: 'Copied',
      description: 'Verify copy success feedback is shown',
    },
    {
      action: 'screenshot',
      name: 'modal-copy-success',
      fullPage: false,
      description: 'Capture copy success state',
    },
    {
      action: 'pressKey',
      key: 'Escape',
      description: 'Close modal with Escape key',
    },
    {
      action: 'wait',
      duration: 300,
      description: 'Wait for modal close animation',
    },
    {
      action: 'screenshot',
      name: 'modal-closed',
      fullPage: true,
      description: 'Verify modal is closed',
    },
    {
      action: 'click',
      selector: 'button:has-text("View Details")',
      description: 'Open modal again',
    },
    {
      action: 'click',
      selector: 'button[aria-label="Close"]',
      description: 'Close modal with close button',
      fallbackSelector: 'svg.lucide-x',
    },
    {
      action: 'wait',
      duration: 300,
      description: 'Wait for modal close animation',
    },
  ],
};

/**
 * Test 5: Complete Wizard Flow with All New Steps
 * 
 * Validates:
 * - Complete navigation through all wizard steps
 * - State persistence across navigation
 * - Selections maintained throughout flow
 * - Prompt generation includes all react-bits selections
 * - Final preview displays all selections
 */
export const testCompleteWizardFlow = {
  name: 'Complete Wizard Flow - All Steps',
  steps: [
    // Step 1: Start fresh
    {
      action: 'navigate',
      url: 'http://localhost:5173',
      description: 'Navigate to application',
    },
    {
      action: 'evaluate',
      script: '() => { localStorage.clear(); }',
      description: 'Clear localStorage for fresh start',
    },
    {
      action: 'navigate',
      url: 'http://localhost:5173',
      description: 'Reload application',
    },
    
    // Step 2: Project Setup
    {
      action: 'fill',
      selector: 'input[name="name"]',
      value: 'E2E Test Project',
      description: 'Fill project name',
      fallbackSelector: 'input[placeholder*="project name"]',
    },
    {
      action: 'fill',
      selector: 'textarea[name="description"]',
      value: 'Testing complete react-bits integration flow',
      description: 'Fill project description',
      fallbackSelector: 'textarea[placeholder*="description"]',
    },
    {
      action: 'click',
      selector: 'button:has-text("Continue")',
      description: 'Continue from Project Setup',
    },
    {
      action: 'screenshot',
      name: 'wizard-flow-01-project-setup',
      fullPage: true,
      description: 'Capture after project setup',
    },
    
    // Step 3-6: Navigate through existing steps (Layout, Design, Color, Typography, Visuals)
    {
      action: 'click',
      selector: '[data-layout="dashboard"]',
      description: 'Select dashboard layout',
      fallbackSelector: 'text=Dashboard',
    },
    {
      action: 'click',
      selector: 'button:has-text("Continue")',
      description: 'Continue from Layout',
    },
    {
      action: 'screenshot',
      name: 'wizard-flow-02-layout',
      fullPage: true,
      description: 'Capture after layout selection',
    },
    
    {
      action: 'click',
      selector: '[data-design="modern"]',
      description: 'Select modern design',
      fallbackSelector: 'text=Modern',
    },
    {
      action: 'click',
      selector: 'button:has-text("Continue")',
      description: 'Continue from Design Style',
    },
    {
      action: 'screenshot',
      name: 'wizard-flow-03-design',
      fullPage: true,
      description: 'Capture after design selection',
    },
    
    {
      action: 'click',
      selector: '[data-color="blue"]',
      description: 'Select blue color theme',
      fallbackSelector: 'text=Blue',
    },
    {
      action: 'click',
      selector: 'button:has-text("Continue")',
      description: 'Continue from Color Theme',
    },
    {
      action: 'screenshot',
      name: 'wizard-flow-04-color',
      fullPage: true,
      description: 'Capture after color selection',
    },
    
    {
      action: 'click',
      selector: '[data-font="inter"]',
      description: 'Select Inter font',
      fallbackSelector: 'text=Inter',
    },
    {
      action: 'click',
      selector: 'button:has-text("Continue")',
      description: 'Continue from Typography',
    },
    {
      action: 'screenshot',
      name: 'wizard-flow-05-typography',
      fullPage: true,
      description: 'Capture after typography selection',
    },
    
    {
      action: 'click',
      selector: '[data-visual="images"]',
      description: 'Select images visual',
      fallbackSelector: 'text=Images',
    },
    {
      action: 'click',
      selector: 'button:has-text("Continue")',
      description: 'Continue from Visuals',
    },
    {
      action: 'screenshot',
      name: 'wizard-flow-06-visuals',
      fullPage: true,
      description: 'Capture after visuals selection',
    },
    
    // Step 7: Background (NEW)
    {
      action: 'verify',
      selector: 'h2:has-text("Background Effects")',
      description: 'Verify arrived at BackgroundStep',
    },
    {
      action: 'click',
      selector: '[data-option-id="aurora"]',
      description: 'Select Aurora background',
      fallbackSelector: 'text=Aurora',
    },
    {
      action: 'screenshot',
      name: 'wizard-flow-07-background',
      fullPage: true,
      description: 'Capture BackgroundStep with selection',
    },
    {
      action: 'click',
      selector: 'button:has-text("Continue to Components")',
      description: 'Continue to Components',
    },
    
    // Step 8: Components (NEW)
    {
      action: 'verify',
      selector: 'h2:has-text("UI Components")',
      description: 'Verify arrived at ComponentsStep',
    },
    {
      action: 'click',
      selector: '[data-option-id="carousel"]',
      description: 'Select Carousel component',
    },
    {
      action: 'click',
      selector: '[data-option-id="accordion"]',
      description: 'Select Accordion component',
    },
    {
      action: 'click',
      selector: '[data-option-id="tabs"]',
      description: 'Select Tabs component',
    },
    {
      action: 'screenshot',
      name: 'wizard-flow-08-components',
      fullPage: true,
      description: 'Capture ComponentsStep with selections',
    },
    {
      action: 'verify',
      text: '3 selected',
      description: 'Verify 3 components selected',
    },
    {
      action: 'click',
      selector: 'button:has-text("Continue to Functionality")',
      description: 'Continue to Functionality',
    },
    
    // Step 9: Functionality
    {
      action: 'click',
      selector: '[data-functionality="authentication"]',
      description: 'Select authentication functionality',
      fallbackSelector: 'text=Authentication',
    },
    {
      action: 'screenshot',
      name: 'wizard-flow-09-functionality',
      fullPage: true,
      description: 'Capture Functionality selection',
    },
    {
      action: 'click',
      selector: 'button:has-text("Continue")',
      description: 'Continue to Animations',
    },
    
    // Step 10: Animations (ENHANCED)
    {
      action: 'verify',
      selector: 'h2:has-text("Animations")',
      description: 'Verify arrived at AnimationsStep',
    },
    {
      action: 'click',
      selector: '[data-option-id="blob-cursor"]',
      description: 'Select Blob Cursor animation',
    },
    {
      action: 'click',
      selector: '[data-option-id="magnetic-button"]',
      description: 'Select Magnetic Button animation',
    },
    {
      action: 'screenshot',
      name: 'wizard-flow-10-animations',
      fullPage: true,
      description: 'Capture AnimationsStep with selections',
    },
    {
      action: 'click',
      selector: 'button:has-text("Continue to Preview")',
      description: 'Continue to Preview',
    },
    
    // Step 11: Preview
    {
      action: 'verify',
      selector: 'h2:has-text("Preview")',
      description: 'Verify arrived at Preview',
    },
    {
      action: 'screenshot',
      name: 'wizard-flow-11-preview',
      fullPage: true,
      description: 'Capture final preview',
    },
    {
      action: 'verify',
      text: 'Background Effect',
      description: 'Verify prompt includes Background section',
    },
    {
      action: 'verify',
      text: 'UI Components',
      description: 'Verify prompt includes Components section',
    },
    {
      action: 'verify',
      text: 'UI/UX Animations',
      description: 'Verify prompt includes Animations section',
    },
    {
      action: 'verify',
      text: 'React-Bits Installation',
      description: 'Verify prompt includes Installation section',
    },
    {
      action: 'verify',
      text: 'Aurora',
      description: 'Verify Aurora background in prompt',
    },
    {
      action: 'verify',
      text: 'Carousel',
      description: 'Verify Carousel component in prompt',
    },
    {
      action: 'verify',
      text: 'Blob Cursor',
      description: 'Verify Blob Cursor animation in prompt',
    },
  ],
};

/**
 * Test 6: Backward Navigation State Persistence
 * 
 * Validates:
 * - Backward navigation maintains selections
 * - Forward navigation restores state
 * - No data loss during navigation
 */
export const testBackwardNavigation = {
  name: 'Backward Navigation - State Persistence',
  steps: [
    {
      action: 'navigate',
      url: 'http://localhost:5173',
      description: 'Navigate to application',
    },
    {
      action: 'click',
      selector: '[data-step="background"]',
      description: 'Navigate to Background step',
    },
    {
      action: 'click',
      selector: '[data-option-id="aurora"]',
      description: 'Select Aurora background',
    },
    {
      action: 'click',
      selector: 'button:has-text("Continue to Components")',
      description: 'Continue to Components',
    },
    {
      action: 'click',
      selector: '[data-option-id="carousel"]',
      description: 'Select Carousel component',
    },
    {
      action: 'click',
      selector: '[data-option-id="accordion"]',
      description: 'Select Accordion component',
    },
    {
      action: 'screenshot',
      name: 'backward-nav-components-selected',
      fullPage: true,
      description: 'Capture components selected',
    },
    {
      action: 'click',
      selector: 'button:has-text("Back to Background")',
      description: 'Navigate back to Background',
    },
    {
      action: 'screenshot',
      name: 'backward-nav-back-to-background',
      fullPage: true,
      description: 'Verify background selection maintained',
    },
    {
      action: 'verify',
      selector: '[data-option-id="aurora"].ring-2',
      description: 'Verify Aurora still selected (has ring-2 class)',
    },
    {
      action: 'click',
      selector: 'button:has-text("Continue to Components")',
      description: 'Navigate forward to Components again',
    },
    {
      action: 'screenshot',
      name: 'backward-nav-forward-to-components',
      fullPage: true,
      description: 'Verify components selections maintained',
    },
    {
      action: 'verify',
      text: '2 selected',
      description: 'Verify 2 components still selected',
    },
  ],
};

/**
 * Test 7: Responsive Design Validation
 * 
 * Validates:
 * - Layout adapts to different viewport sizes
 * - Grid columns adjust correctly
 * - Mobile navigation works
 */
export const testResponsiveDesign = {
  name: 'Responsive Design - Multiple Viewports',
  steps: [
    // Desktop
    {
      action: 'navigate',
      url: 'http://localhost:5173',
      viewport: { width: 1920, height: 1080 },
      description: 'Navigate with desktop viewport',
    },
    {
      action: 'click',
      selector: '[data-step="background"]',
      description: 'Navigate to Background step',
    },
    {
      action: 'screenshot',
      name: 'responsive-desktop-background',
      fullPage: true,
      description: 'Capture desktop layout',
    },
    
    // Tablet
    {
      action: 'navigate',
      url: 'http://localhost:5173',
      viewport: { width: 768, height: 1024 },
      description: 'Navigate with tablet viewport',
    },
    {
      action: 'click',
      selector: '[data-step="background"]',
      description: 'Navigate to Background step',
    },
    {
      action: 'screenshot',
      name: 'responsive-tablet-background',
      fullPage: true,
      description: 'Capture tablet layout',
    },
    
    // Mobile
    {
      action: 'navigate',
      url: 'http://localhost:5173',
      viewport: { width: 375, height: 667 },
      description: 'Navigate with mobile viewport',
    },
    {
      action: 'click',
      selector: '[data-step="background"]',
      description: 'Navigate to Background step',
    },
    {
      action: 'screenshot',
      name: 'responsive-mobile-background',
      fullPage: true,
      description: 'Capture mobile layout',
    },
  ],
};

/**
 * Test 8: Keyboard Navigation and Accessibility
 * 
 * Validates:
 * - Tab navigation through cards
 * - Enter key selection
 * - Escape key modal close
 * - Focus indicators visible
 */
export const testKeyboardNavigation = {
  name: 'Keyboard Navigation - Accessibility',
  steps: [
    {
      action: 'navigate',
      url: 'http://localhost:5173',
      description: 'Navigate to application',
    },
    {
      action: 'click',
      selector: '[data-step="background"]',
      description: 'Navigate to Background step',
    },
    {
      action: 'pressKey',
      key: 'Tab',
      description: 'Tab to first card',
    },
    {
      action: 'screenshot',
      name: 'keyboard-nav-first-focus',
      fullPage: false,
      description: 'Capture focus indicator on first card',
    },
    {
      action: 'pressKey',
      key: 'Tab',
      description: 'Tab to second card',
    },
    {
      action: 'pressKey',
      key: 'Enter',
      description: 'Select card with Enter key',
    },
    {
      action: 'screenshot',
      name: 'keyboard-nav-selected',
      fullPage: true,
      description: 'Verify selection via keyboard',
    },
    {
      action: 'click',
      selector: 'button:has-text("View Details")',
      description: 'Open modal',
    },
    {
      action: 'pressKey',
      key: 'Escape',
      description: 'Close modal with Escape',
    },
    {
      action: 'wait',
      duration: 300,
      description: 'Wait for modal close',
    },
    {
      action: 'screenshot',
      name: 'keyboard-nav-modal-closed',
      fullPage: true,
      description: 'Verify modal closed via Escape',
    },
  ],
};

// Export all tests
export const allE2ETests = [
  testBackgroundStepNavigation,
  testComponentsStepMultipleSelection,
  testAnimationsStepReactBits,
  testModalInteractions,
  testCompleteWizardFlow,
  testBackwardNavigation,
  testResponsiveDesign,
  testKeyboardNavigation,
];

// Test execution summary
export const testSummary = {
  totalTests: allE2ETests.length,
  testNames: allE2ETests.map(t => t.name),
  estimatedDuration: '15-20 minutes',
  prerequisites: [
    'Development server running on http://localhost:5173',
    'Playwright MCP server configured',
    'Clean browser state (no cached data)',
  ],
  expectedScreenshots: 40,
};
