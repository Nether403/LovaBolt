# Implementation Plan

- [x] 1. Update type definitions and create data structures




  - Add ReactBitsComponent, BackgroundOption, ComponentOption, and AnimationOption interfaces to src/types/index.ts
  - Create src/data/reactBitsData.ts with all 93 react-bits components (31 backgrounds, 37 components, 25 animations)
  - Ensure all data entries include id, name, title, description, category, dependencies array, and cliCommand
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 2. Create reusable UI components





  - [x] 2.1 Implement ReactBitsCard component


    - Create src/components/cards/ReactBitsCard.tsx with props for option, isSelected, onSelect, and onViewDetails
    - Implement glassmorphism card styling matching existing step components
    - Add selection indicator with teal accent color
    - Display component title, description, and dependencies badges
    - Add "View Details" button with ChevronRight icon
    - Apply hover scale transformation and ring styling for selected state
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 9.1, 9.2, 9.3, 9.4, 9.5_


  - [x] 2.2 Implement ReactBitsModal component

    - Create src/components/modals/ReactBitsModal.tsx with props for isOpen, onClose, and option
    - Display full component description, dependencies list, and CLI command
    - Implement copy-to-clipboard functionality for CLI command with visual feedback
    - Show optional code snippet if available
    - Add close button with X icon
    - Apply glassmorphism styling consistent with existing modals
    - _Requirements: 7.5, 7.6_

- [x] 3. Update context for state management





  - Add selectedBackground state (BackgroundOption | null) to BoltBuilderContext
  - Add selectedComponents state (ComponentOption[]) to BoltBuilderContext
  - Update selectedAnimations type from string[] to AnimationOption[]
  - Add setSelectedBackground, setSelectedComponents, and setSelectedAnimations to context interface
  - Update progress calculation to use totalSteps = 10 and include background and components checks
  - Update saveProject function to include selectedBackground, selectedComponents, and updated selectedAnimations
  - Update loadProject function to restore selectedBackground, selectedComponents, and updated selectedAnimations
  - Update clearProject function to reset new state variables
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_
-

- [x] 4. Implement BackgroundStep component




  - Create src/components/steps/BackgroundStep.tsx with single-selection logic
  - Import backgroundOptions from reactBitsData
  - Implement header with title "Background Effects" and descriptive text
  - Create responsive grid layout (1 column mobile, 2 tablet, 3 desktop) displaying all 31 backgrounds
  - Use ReactBitsCard for each background option with single-selection behavior
  - Implement modal state management for detail view
  - Display selected background's CLI command in a glassmorphism card when a background is selected
  - Add navigation buttons: "Back to Visuals" and "Continue to Components"
  - Integrate ReactBitsModal for detailed background information
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 5. Implement ComponentsStep component





  - Create src/components/steps/ComponentsStep.tsx with multiple-selection logic
  - Import componentOptions from reactBitsData
  - Implement header with title "UI Components" and selected count display
  - Create responsive grid layout (1 column mobile, 2 tablet, 3 desktop) displaying all 37 components
  - Use ReactBitsCard for each component option with toggle selection behavior
  - Implement modal state management for detail view
  - Display all selected components' CLI commands in a consolidated list when components are selected
  - Add navigation buttons: "Back to Background" and "Continue to Functionality"
  - Integrate ReactBitsModal for detailed component information
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 6. Update AnimationsStep component






  - Update src/components/steps/AnimationsStep.tsx to use AnimationOption instead of string types
  - Replace animationTypes import from wizardData with animationOptions from reactBitsData
  - Update selection logic to work with AnimationOption objects (toggle by id)
  - Use ReactBitsCard for each animation option
  - Add modal state management for detail view
  - Display all selected animations' CLI commands in a consolidated list
  - Update navigation to point to correct previous step (functionality)
  - Integrate ReactBitsModal for detailed animation information
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 7. Update Sidebar navigation





  - Update src/components/Sidebar.tsx to include new steps in the steps array
  - Add "Background" as step 7 with id 'background'
  - Add "Components" as step 8 with id 'components'
  - Update "Functionality" to step 9
  - Update "Animations" to step 10
  - Update "Preview" to step 11
  - Ensure step highlighting works correctly for new steps
  - _Requirements: 8.1_

- [x] 8. Update step navigation flow





  - Update VisualsStep to navigate to 'background' on continue
  - Update BackgroundStep to navigate to 'components' on continue and 'visuals' on back
  - Update ComponentsStep to navigate to 'functionality' on continue and 'background' on back
  - Update FunctionalityStep to navigate to 'animations' on continue and 'components' on back
  - Update AnimationsStep to navigate to 'preview' on continue and 'functionality' on back
  - _Requirements: 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

- [x] 9. Enhance prompt generation





  - Update generatePrompt function in BoltBuilderContext to include Background section (section 7)
  - Add UI Components section (section 8) with all selected components, descriptions, and CLI commands
  - Update UI/UX Animations section (section 9) to use AnimationOption data with descriptions and CLI commands
  - Add React-Bits Installation section (section 12) with grouped dependency installation and component installation commands
  - Handle empty states: display "None" for background, "No additional components selected" for components
  - Include code snippets for components when available
  - Renumber existing sections to accommodate new sections
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

- [x] 10. Add error handling





  - Wrap BackgroundStep, ComponentsStep, and AnimationsStep with ErrorBoundary components
  - Add try-catch blocks in saveProject and loadProject for localStorage operations
  - Implement fallback UI for data loading failures in step components
  - Add error logging for debugging purposes
  - Ensure modal errors don't crash parent components
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 11. Implement routing integration





  - Update main App.tsx or routing configuration to include new step routes
  - Ensure 'background' and 'components' step IDs are recognized by the routing system
  - Test navigation between all steps including new ones
  - Verify URL updates correctly when navigating to new steps
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

- [x] 12. Add performance optimizations





  - Memoize ReactBitsCard component with React.memo
  - Memoize ReactBitsModal component with React.memo
  - Use useCallback for selection handlers in step components
  - Implement debouncing for localStorage saves if performance issues occur
  - Consider code splitting for step components if bundle size is a concern
  - _Requirements: Design document performance section_

- [x] 13. Implement accessibility features





  - Add proper ARIA labels to ReactBitsCard for selection state
  - Ensure all cards are keyboard navigable with proper focus indicators
  - Add keyboard support for modal (Escape to close)
  - Test with screen readers to ensure selection changes are announced
  - Verify color contrast meets WCAG 2.1 AA standards
  - _Requirements: Design document accessibility section_
-

- [x] 14. Add visual polish



  - Ensure glassmorphism effects are consistent across all new components
  - Verify teal accent colors match existing design system
  - Test responsive layouts on mobile, tablet, and desktop viewports
  - Add smooth transitions for card hover and selection states
  - Ensure loading states are visually consistent if implemented
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 15. Integration testing





  - Test complete wizard flow from project setup through preview with new steps
  - Verify state persistence across step navigation
  - Test localStorage save/load with new state variables
  - Verify prompt generation includes all react-bits selections correctly
  - Test edge cases: no selections, all selections, mixed selections
  - Test backward navigation maintains state correctly
  - _Requirements: All requirements_

- [x] 16. End-to-end testing with Playwright







  - Write E2E test for navigating to BackgroundStep and selecting a background
  - Write E2E test for navigating to ComponentsStep and selecting multiple components
  - Write E2E test for AnimationsStep with new react-bits animations
  - Write E2E test for complete wizard flow with all new steps
  - Capture screenshots of each new step for documentation
  - Test modal interactions (open, close, copy CLI command)
  - _Requirements: Design document testing strategy_

- [x] 17. Create documentation




  - Document the new step components in code comments
  - Add JSDoc comments to ReactBitsCard and ReactBitsModal components
  - Document the react-bits data structure and how to add new components
  - Create usage examples for the new steps
  - Update any existing documentation to reflect the new wizard flow
  - _Requirements: Design document_
