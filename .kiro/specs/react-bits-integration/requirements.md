# Requirements Document

## Introduction

This specification defines the integration of react-bits components into the LovaBolt wizard application. The integration enhances the existing wizard flow by adding two new configuration steps (Background and Components) and enhancing the existing Animations step with react-bits animation options. This enables users to select from 93 pre-built, production-ready React components including 31 backgrounds, 37 UI components, and 25 animations, with automatic CLI command generation for installation.

## Glossary

- **LovaBolt System**: The web application wizard that guides users through project configuration
- **React-Bits Component**: A pre-built React component from the react-bits library with associated metadata
- **Wizard Step**: A discrete configuration page in the LovaBolt wizard flow
- **Background Option**: A react-bits component that provides full-page background effects (single selection)
- **Component Option**: A react-bits UI component for interface elements (multiple selection)
- **Animation Option**: A react-bits animation or interaction effect (multiple selection)
- **CLI Command**: The npx shadcn command string required to install a react-bits component
- **Selection State**: The current set of user-selected react-bits components stored in application context
- **Prompt Generator**: The system function that creates AI-ready project specifications
- **Context Provider**: The React context that manages global wizard state
- **Step Navigation**: The mechanism for moving between wizard steps with validation

## Requirements

### Requirement 1: Background Selection Step

**User Story:** As a LovaBolt user, I want to select a background effect for my project, so that I can enhance the visual appeal with minimal effort.

#### Acceptance Criteria

1. WHEN THE LovaBolt System renders the background step, THE LovaBolt System SHALL display all 31 background options in a responsive grid layout
2. WHEN a user clicks on a background option card, THE LovaBolt System SHALL select that background and deselect any previously selected background
3. WHEN a background option is selected, THE LovaBolt System SHALL display a visual indicator on the selected card
4. WHEN a background option is selected, THE LovaBolt System SHALL display the associated CLI command prominently on the page
5. WHEN a user clicks the "View Details" button on a background card, THE LovaBolt System SHALL open a modal displaying the full description, dependencies list, and CLI command

### Requirement 2: Component Selection Step

**User Story:** As a LovaBolt user, I want to select multiple UI components for my project, so that I can build feature-rich interfaces without writing components from scratch.

#### Acceptance Criteria

1. WHEN THE LovaBolt System renders the components step, THE LovaBolt System SHALL display all 37 component options in a responsive grid layout
2. WHEN a user clicks on a component option card, THE LovaBolt System SHALL toggle the selection state of that component
3. WHEN component options are selected, THE LovaBolt System SHALL display visual indicators on all selected cards
4. WHEN one or more components are selected, THE LovaBolt System SHALL display a count of selected components
5. WHEN one or more components are selected, THE LovaBolt System SHALL display all associated CLI commands in a consolidated list
6. WHEN a user clicks the "View Details" button on a component card, THE LovaBolt System SHALL open a modal displaying the full description, features list, dependencies, and CLI command

### Requirement 3: Enhanced Animations Step

**User Story:** As a LovaBolt user, I want to select animation effects from react-bits, so that I can add professional interactions to my project with installation commands provided.

#### Acceptance Criteria

1. WHEN THE LovaBolt System renders the animations step, THE LovaBolt System SHALL display all 25 animation options in a responsive grid layout
2. WHEN a user clicks on an animation option card, THE LovaBolt System SHALL toggle the selection state of that animation
3. WHEN animation options are selected, THE LovaBolt System SHALL display visual indicators on all selected cards
4. WHEN one or more animations are selected, THE LovaBolt System SHALL display all associated CLI commands in a consolidated list
5. WHEN a user clicks the "View Details" button on an animation card, THE LovaBolt System SHALL open a modal displaying the full description, dependencies, and CLI command

### Requirement 4: Type System and Data Structure

**User Story:** As a developer, I want strongly-typed interfaces for react-bits components, so that the codebase remains maintainable and type-safe.

#### Acceptance Criteria

1. THE LovaBolt System SHALL define a ReactBitsComponent interface containing id, name, title, description, category, dependencies array, cliCommand, optional codeSnippet, and optional hasCustomization fields
2. THE LovaBolt System SHALL define BackgroundOption as an extension of ReactBitsComponent with category fixed to 'backgrounds'
3. THE LovaBolt System SHALL define ComponentOption as an extension of ReactBitsComponent with category fixed to 'components'
4. THE LovaBolt System SHALL define AnimationOption as an extension of ReactBitsComponent with category fixed to 'animations'
5. THE LovaBolt System SHALL export all 93 react-bits components as typed constant arrays in a dedicated data file

### Requirement 5: Context State Management

**User Story:** As a developer, I want react-bits selections managed in global context, so that selections persist across step navigation and are available for prompt generation.

#### Acceptance Criteria

1. THE LovaBolt System SHALL add selectedBackground state to the Context Provider with type BackgroundOption or null
2. THE LovaBolt System SHALL add selectedComponents state to the Context Provider with type array of ComponentOption
3. THE LovaBolt System SHALL update selectedAnimations state type from string array to array of AnimationOption
4. THE LovaBolt System SHALL add setSelectedBackground, setSelectedComponents, and setSelectedAnimations functions to the context interface
5. THE LovaBolt System SHALL include react-bits selections in the saveProject function for localStorage persistence
6. THE LovaBolt System SHALL include react-bits selections in the loadProject function for state restoration
7. THE LovaBolt System SHALL update the progress calculation to account for 10 total steps instead of 8

### Requirement 6: Prompt Generation Enhancement

**User Story:** As a LovaBolt user, I want my selected react-bits components included in the generated prompt, so that AI tools can implement my project with the correct components and installation commands.

#### Acceptance Criteria

1. WHEN THE LovaBolt System generates a detailed prompt, THE LovaBolt System SHALL include a Background section with the selected background title, description, and CLI command
2. WHEN THE LovaBolt System generates a detailed prompt, THE LovaBolt System SHALL include a UI Components section listing all selected components with their descriptions and CLI commands
3. WHEN THE LovaBolt System generates a detailed prompt, THE LovaBolt System SHALL include an enhanced UI/UX Animations section listing all selected animations with their descriptions and CLI commands
4. WHEN THE LovaBolt System generates a detailed prompt, THE LovaBolt System SHALL include an Installation Commands section with all CLI commands grouped in executable bash format
5. WHEN THE LovaBolt System generates a detailed prompt, THE LovaBolt System SHALL list dependencies for each selected react-bits component
6. WHEN no background is selected, THE LovaBolt System SHALL display "None" in the Background section
7. WHEN no components are selected, THE LovaBolt System SHALL display "No additional components selected" in the UI Components section

### Requirement 7: Reusable UI Components

**User Story:** As a developer, I want reusable card and modal components for react-bits items, so that the UI remains consistent and maintainable across all three steps.

#### Acceptance Criteria

1. THE LovaBolt System SHALL provide a ReactBitsCard component that accepts component data, selection state, and click handlers as props
2. WHEN THE ReactBitsCard component renders, THE ReactBitsCard component SHALL display the component title, description, and dependencies badge
3. WHEN THE ReactBitsCard component is in selected state, THE ReactBitsCard component SHALL display a visual selection indicator
4. WHEN THE ReactBitsCard component is clicked, THE ReactBitsCard component SHALL invoke the provided selection handler
5. THE LovaBolt System SHALL provide a ReactBitsModal component that accepts component data and visibility state as props
6. WHEN THE ReactBitsModal component is open, THE ReactBitsModal component SHALL display the full description, dependencies list, and CLI command with copy functionality

### Requirement 8: Navigation Flow Updates

**User Story:** As a LovaBolt user, I want seamless navigation through the enhanced wizard flow, so that I can configure my project without confusion.

#### Acceptance Criteria

1. THE LovaBolt System SHALL update the Sidebar component to display Background as step 7, Components as step 8, Functionality as step 9, Animations as step 10, and Preview as step 11
2. WHEN a user completes the Visuals step, THE LovaBolt System SHALL navigate to the Background step
3. WHEN a user completes the Background step, THE LovaBolt System SHALL navigate to the Components step
4. WHEN a user completes the Components step, THE LovaBolt System SHALL navigate to the Functionality step
5. WHEN a user completes the Functionality step, THE LovaBolt System SHALL navigate to the Animations step
6. WHEN a user completes the Animations step, THE LovaBolt System SHALL navigate to the Preview step
7. WHEN a user clicks "Back" on any new or updated step, THE LovaBolt System SHALL navigate to the correct previous step

### Requirement 9: Visual Design Consistency

**User Story:** As a LovaBolt user, I want the new steps to match the existing design language, so that the wizard feels cohesive and professional.

#### Acceptance Criteria

1. THE LovaBolt System SHALL apply glassmorphism card styling to all react-bits component cards
2. THE LovaBolt System SHALL use teal accent colors for selection indicators consistent with existing steps
3. THE LovaBolt System SHALL apply hover scale transformations to cards matching existing step behavior
4. THE LovaBolt System SHALL use the same typography hierarchy as existing steps for headings and descriptions
5. THE LovaBolt System SHALL maintain consistent spacing and grid layouts across all steps

### Requirement 10: Error Handling and Edge Cases

**User Story:** As a LovaBolt user, I want the wizard to handle errors gracefully, so that I can complete my configuration even if issues occur.

#### Acceptance Criteria

1. WHEN THE LovaBolt System fails to load react-bits data, THE LovaBolt System SHALL display an error message and allow navigation to other steps
2. WHEN a user attempts to proceed from the Background step without selecting a background, THE LovaBolt System SHALL allow progression as background selection is optional
3. WHEN a user attempts to proceed from the Components step without selecting components, THE LovaBolt System SHALL allow progression as component selection is optional
4. WHEN localStorage data is corrupted, THE LovaBolt System SHALL clear the corrupted data and initialize with default values
5. IF a modal fails to render, THEN THE LovaBolt System SHALL log the error and prevent application crash using error boundaries
