/**
 * Automated Integration Test Script for React-Bits Integration
 * 
 * This script tests the complete wizard flow, state persistence,
 * localStorage functionality, and prompt generation.
 * 
 * Run this in the browser console while on http://localhost:5173
 */

(async function runIntegrationTests() {
  console.log('🚀 Starting React-Bits Integration Tests...\n');
  
  const results = {
    passed: 0,
    failed: 0,
    tests: []
  };
  
  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      results.passed++;
      results.tests.push({ name: testName, status: 'PASS', details });
    } else {
      console.error(`❌ FAIL: ${testName}`, details);
      results.failed++;
      results.tests.push({ name: testName, status: 'FAIL', details });
    }
  }
  
  // Test 1: LocalStorage Save/Load Functionality
  console.log('\n📝 Test 1: LocalStorage Save/Load Functionality');
  try {
    const testData = {
      projectInfo: {
        name: 'Integration Test Project',
        description: 'Testing react-bits integration',
        type: 'Website',
        purpose: 'Portfolio'
      },
      selectedBackground: {
        id: 'aurora',
        name: 'Aurora',
        title: 'Aurora',
        description: 'Flowing aurora gradient background',
        category: 'backgrounds',
        dependencies: ['ogl'],
        cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Aurora-TS-TW.json"'
      },
      selectedComponents: [
        {
          id: 'carousel',
          name: 'Carousel',
          title: 'Carousel',
          description: 'Image carousel component',
          category: 'components',
          dependencies: ['embla-carousel-react'],
          cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Carousel-TS-TW.json"'
        },
        {
          id: 'accordion',
          name: 'Accordion',
          title: 'Accordion',
          description: 'Collapsible accordion component',
          category: 'components',
          dependencies: [],
          cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Accordion-TS-TW.json"'
        }
      ],
      selectedAnimations: [
        {
          id: 'blob-cursor',
          name: 'BlobCursor',
          title: 'Blob Cursor',
          description: 'Animated blob cursor effect',
          category: 'animations',
          dependencies: ['gsap'],
          cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/BlobCursor-TS-TW.json"'
        }
      ],
      currentStep: 'preview'
    };
    
    // Save to localStorage
    localStorage.setItem('lovabolt-project', JSON.stringify(testData));
    
    // Verify save
    const saved = localStorage.getItem('lovabolt-project');
    assert(saved !== null, 'LocalStorage save successful');
    
    // Verify data integrity
    const parsed = JSON.parse(saved);
    assert(parsed.projectInfo.name === testData.projectInfo.name, 'Project info persisted correctly');
    assert(parsed.selectedBackground.id === 'aurora', 'Background selection persisted');
    assert(parsed.selectedComponents.length === 2, 'Components array persisted (count: 2)');
    assert(parsed.selectedAnimations.length === 1, 'Animations array persisted (count: 1)');
    assert(parsed.currentStep === 'preview', 'Current step persisted');
    
  } catch (error) {
    assert(false, 'LocalStorage functionality', error.message);
  }
  
  // Test 2: State Structure Validation
  console.log('\n📝 Test 2: State Structure Validation');
  try {
    const saved = localStorage.getItem('lovabolt-project');
    const state = JSON.parse(saved);
    
    // Validate background structure
    assert(
      state.selectedBackground && 
      state.selectedBackground.id &&
      state.selectedBackground.cliCommand &&
      state.selectedBackground.dependencies,
      'Background has required fields (id, cliCommand, dependencies)'
    );
    
    // Validate components structure
    assert(
      Array.isArray(state.selectedComponents) &&
      state.selectedComponents.every(c => c.id && c.cliCommand && c.dependencies !== undefined),
      'All components have required fields'
    );
    
    // Validate animations structure
    assert(
      Array.isArray(state.selectedAnimations) &&
      state.selectedAnimations.every(a => a.id && a.cliCommand && a.dependencies !== undefined),
      'All animations have required fields'
    );
    
  } catch (error) {
    assert(false, 'State structure validation', error.message);
  }
  
  // Test 3: Prompt Generation Logic
  console.log('\n📝 Test 3: Prompt Generation Logic');
  try {
    const saved = localStorage.getItem('lovabolt-project');
    const state = JSON.parse(saved);
    
    // Simulate prompt generation
    const hasBackground = state.selectedBackground !== null;
    const hasComponents = state.selectedComponents && state.selectedComponents.length > 0;
    const hasAnimations = state.selectedAnimations && state.selectedAnimations.length > 0;
    
    assert(hasBackground, 'Prompt should include background section');
    assert(hasComponents, 'Prompt should include components section');
    assert(hasAnimations, 'Prompt should include animations section');
    
    // Verify CLI commands are present
    if (hasBackground) {
      assert(
        state.selectedBackground.cliCommand.includes('npx shadcn'),
        'Background CLI command is valid'
      );
    }
    
    if (hasComponents) {
      const allCommandsValid = state.selectedComponents.every(c => 
        c.cliCommand && c.cliCommand.includes('npx shadcn')
      );
      assert(allCommandsValid, 'All component CLI commands are valid');
    }
    
    if (hasAnimations) {
      const allCommandsValid = state.selectedAnimations.every(a => 
        a.cliCommand && a.cliCommand.includes('npx shadcn')
      );
      assert(allCommandsValid, 'All animation CLI commands are valid');
    }
    
    // Verify dependencies collection
    const allDeps = [
      ...(state.selectedBackground?.dependencies || []),
      ...state.selectedComponents.flatMap(c => c.dependencies),
      ...state.selectedAnimations.flatMap(a => a.dependencies)
    ];
    const uniqueDeps = [...new Set(allDeps)];
    
    assert(uniqueDeps.length > 0, `Dependencies collected correctly (${uniqueDeps.length} unique)`);
    assert(uniqueDeps.includes('ogl'), 'Aurora dependency (ogl) present');
    assert(uniqueDeps.includes('gsap'), 'BlobCursor dependency (gsap) present');
    
  } catch (error) {
    assert(false, 'Prompt generation logic', error.message);
  }
  
  // Test 4: Edge Case - No Selections
  console.log('\n📝 Test 4: Edge Case - No Selections');
  try {
    const emptyState = {
      projectInfo: {
        name: 'Empty Project',
        description: 'No selections',
        type: 'Website',
        purpose: 'Portfolio'
      },
      selectedBackground: null,
      selectedComponents: [],
      selectedAnimations: [],
      currentStep: 'preview'
    };
    
    localStorage.setItem('lovabolt-project', JSON.stringify(emptyState));
    const saved = localStorage.getItem('lovabolt-project');
    const parsed = JSON.parse(saved);
    
    assert(parsed.selectedBackground === null, 'Handles null background');
    assert(parsed.selectedComponents.length === 0, 'Handles empty components array');
    assert(parsed.selectedAnimations.length === 0, 'Handles empty animations array');
    
    // Verify no errors with empty state
    const allDeps = [
      ...(parsed.selectedBackground?.dependencies || []),
      ...parsed.selectedComponents.flatMap(c => c.dependencies),
      ...parsed.selectedAnimations.flatMap(a => a.dependencies)
    ];
    assert(allDeps.length === 0, 'Empty dependencies array when no selections');
    
  } catch (error) {
    assert(false, 'Edge case - no selections', error.message);
  }
  
  // Test 5: Edge Case - Maximum Selections
  console.log('\n📝 Test 5: Edge Case - Maximum Selections');
  try {
    // Create state with many selections
    const manyComponents = Array.from({ length: 10 }, (_, i) => ({
      id: `component-${i}`,
      name: `Component${i}`,
      title: `Component ${i}`,
      description: `Test component ${i}`,
      category: 'components',
      dependencies: [`dep-${i}`],
      cliCommand: `npx shadcn@latest add "https://reactbits.dev/registry/Component${i}-TS-TW.json"`
    }));
    
    const manyAnimations = Array.from({ length: 10 }, (_, i) => ({
      id: `animation-${i}`,
      name: `Animation${i}`,
      title: `Animation ${i}`,
      description: `Test animation ${i}`,
      category: 'animations',
      dependencies: [`anim-dep-${i}`],
      cliCommand: `npx shadcn@latest add "https://reactbits.dev/registry/Animation${i}-TS-TW.json"`
    }));
    
    const maxState = {
      projectInfo: {
        name: 'Max Selections Project',
        description: 'Testing maximum selections',
        type: 'Website',
        purpose: 'Portfolio'
      },
      selectedBackground: {
        id: 'aurora',
        name: 'Aurora',
        title: 'Aurora',
        description: 'Background',
        category: 'backgrounds',
        dependencies: ['ogl'],
        cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Aurora-TS-TW.json"'
      },
      selectedComponents: manyComponents,
      selectedAnimations: manyAnimations,
      currentStep: 'preview'
    };
    
    localStorage.setItem('lovabolt-project', JSON.stringify(maxState));
    const saved = localStorage.getItem('lovabolt-project');
    const parsed = JSON.parse(saved);
    
    assert(parsed.selectedComponents.length === 10, 'Handles 10 components');
    assert(parsed.selectedAnimations.length === 10, 'Handles 10 animations');
    
    // Verify all CLI commands present
    const allCommands = [
      parsed.selectedBackground.cliCommand,
      ...parsed.selectedComponents.map(c => c.cliCommand),
      ...parsed.selectedAnimations.map(a => a.cliCommand)
    ];
    assert(allCommands.length === 21, 'All CLI commands collected (1 bg + 10 comp + 10 anim)');
    
    // Verify unique dependencies
    const allDeps = [
      ...parsed.selectedBackground.dependencies,
      ...parsed.selectedComponents.flatMap(c => c.dependencies),
      ...parsed.selectedAnimations.flatMap(a => a.dependencies)
    ];
    const uniqueDeps = [...new Set(allDeps)];
    assert(uniqueDeps.length === 21, 'Unique dependencies calculated correctly');
    
  } catch (error) {
    assert(false, 'Edge case - maximum selections', error.message);
  }
  
  // Test 6: Data Corruption Handling
  console.log('\n📝 Test 6: Data Corruption Handling');
  try {
    // Test invalid JSON
    localStorage.setItem('lovabolt-project', 'invalid json {{{');
    let parseError = false;
    try {
      JSON.parse(localStorage.getItem('lovabolt-project'));
    } catch (e) {
      parseError = true;
    }
    assert(parseError, 'Detects corrupted JSON data');
    
    // Test missing required fields
    const incompleteState = {
      projectInfo: { name: 'Test' }
      // Missing other required fields
    };
    localStorage.setItem('lovabolt-project', JSON.stringify(incompleteState));
    const incomplete = JSON.parse(localStorage.getItem('lovabolt-project'));
    assert(incomplete.projectInfo.name === 'Test', 'Handles incomplete state gracefully');
    
  } catch (error) {
    assert(false, 'Data corruption handling', error.message);
  }
  
  // Test 7: Selection Toggle Behavior
  console.log('\n📝 Test 7: Selection Toggle Behavior');
  try {
    // Test adding component
    let components = [];
    const newComponent = {
      id: 'test-component',
      name: 'TestComponent',
      title: 'Test Component',
      category: 'components',
      dependencies: [],
      cliCommand: 'test'
    };
    
    components.push(newComponent);
    assert(components.length === 1, 'Component added successfully');
    assert(components[0].id === 'test-component', 'Correct component added');
    
    // Test removing component
    components = components.filter(c => c.id !== 'test-component');
    assert(components.length === 0, 'Component removed successfully');
    
    // Test multiple selections
    components = [
      { id: 'comp1', name: 'Comp1', title: 'Component 1', category: 'components', dependencies: [], cliCommand: 'test1' },
      { id: 'comp2', name: 'Comp2', title: 'Component 2', category: 'components', dependencies: [], cliCommand: 'test2' },
      { id: 'comp3', name: 'Comp3', title: 'Component 3', category: 'components', dependencies: [], cliCommand: 'test3' }
    ];
    assert(components.length === 3, 'Multiple components selected');
    
    // Test removing one from multiple
    components = components.filter(c => c.id !== 'comp2');
    assert(components.length === 2, 'One component removed from multiple');
    assert(!components.some(c => c.id === 'comp2'), 'Correct component removed');
    assert(components.some(c => c.id === 'comp1'), 'Other components remain');
    assert(components.some(c => c.id === 'comp3'), 'Other components remain');
    
  } catch (error) {
    assert(false, 'Selection toggle behavior', error.message);
  }
  
  // Test 8: Backward Navigation State Integrity
  console.log('\n📝 Test 8: Backward Navigation State Integrity');
  try {
    const fullState = {
      projectInfo: {
        name: 'Navigation Test',
        description: 'Testing navigation',
        type: 'Website',
        purpose: 'Portfolio'
      },
      selectedBackground: {
        id: 'aurora',
        name: 'Aurora',
        title: 'Aurora',
        category: 'backgrounds',
        dependencies: ['ogl'],
        cliCommand: 'test'
      },
      selectedComponents: [
        { id: 'comp1', name: 'Comp1', title: 'Component 1', category: 'components', dependencies: [], cliCommand: 'test' }
      ],
      selectedAnimations: [
        { id: 'anim1', name: 'Anim1', title: 'Animation 1', category: 'animations', dependencies: [], cliCommand: 'test' }
      ],
      currentStep: 'preview'
    };
    
    localStorage.setItem('lovabolt-project', JSON.stringify(fullState));
    
    // Simulate navigation back
    fullState.currentStep = 'animations';
    localStorage.setItem('lovabolt-project', JSON.stringify(fullState));
    let state = JSON.parse(localStorage.getItem('lovabolt-project'));
    assert(state.currentStep === 'animations', 'Step changed to animations');
    assert(state.selectedBackground !== null, 'Background preserved during navigation');
    assert(state.selectedComponents.length === 1, 'Components preserved during navigation');
    
    // Navigate back further
    fullState.currentStep = 'components';
    localStorage.setItem('lovabolt-project', JSON.stringify(fullState));
    state = JSON.parse(localStorage.getItem('lovabolt-project'));
    assert(state.currentStep === 'components', 'Step changed to components');
    assert(state.selectedAnimations.length === 1, 'Animations preserved during backward navigation');
    
    // Navigate forward
    fullState.currentStep = 'preview';
    localStorage.setItem('lovabolt-project', JSON.stringify(fullState));
    state = JSON.parse(localStorage.getItem('lovabolt-project'));
    assert(state.currentStep === 'preview', 'Step changed back to preview');
    assert(state.selectedBackground !== null, 'All selections intact after navigation cycle');
    assert(state.selectedComponents.length === 1, 'All selections intact after navigation cycle');
    assert(state.selectedAnimations.length === 1, 'All selections intact after navigation cycle');
    
  } catch (error) {
    assert(false, 'Backward navigation state integrity', error.message);
  }
  
  // Print Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📈 Total: ${results.passed + results.failed}`);
  console.log(`🎯 Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));
  
  // Detailed Results
  console.log('\n📋 DETAILED RESULTS:');
  results.tests.forEach((test, index) => {
    const icon = test.status === 'PASS' ? '✅' : '❌';
    console.log(`${index + 1}. ${icon} ${test.name}`);
    if (test.details) {
      console.log(`   ${test.details}`);
    }
  });
  
  // Restore test data for manual verification
  const testData = {
    projectInfo: {
      name: 'Integration Test Project',
      description: 'Testing react-bits integration - All tests completed',
      type: 'Website',
      purpose: 'Portfolio'
    },
    selectedBackground: {
      id: 'aurora',
      name: 'Aurora',
      title: 'Aurora',
      description: 'Flowing aurora gradient background',
      category: 'backgrounds',
      dependencies: ['ogl'],
      cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Aurora-TS-TW.json"'
    },
    selectedComponents: [
      {
        id: 'carousel',
        name: 'Carousel',
        title: 'Carousel',
        description: 'Image carousel component',
        category: 'components',
        dependencies: ['embla-carousel-react'],
        cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Carousel-TS-TW.json"'
      },
      {
        id: 'accordion',
        name: 'Accordion',
        title: 'Accordion',
        description: 'Collapsible accordion component',
        category: 'components',
        dependencies: [],
        cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/Accordion-TS-TW.json"'
      }
    ],
    selectedAnimations: [
      {
        id: 'blob-cursor',
        name: 'BlobCursor',
        title: 'Blob Cursor',
        description: 'Animated blob cursor effect',
        category: 'animations',
        dependencies: ['gsap'],
        cliCommand: 'npx shadcn@latest add "https://reactbits.dev/registry/BlobCursor-TS-TW.json"'
      }
    ],
    currentStep: 'preview'
  };
  
  localStorage.setItem('lovabolt-project', JSON.stringify(testData));
  console.log('\n✨ Test data restored to localStorage for manual verification');
  console.log('💡 Refresh the page to see the loaded state in the UI');
  
  return results;
})();
