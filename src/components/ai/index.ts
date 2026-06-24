/**
 * AI Components Index
 *
 * Central export point for all AI-related components.
 *
 * NOTE: Premium/upgrade/analytics-dashboard client-side surfaces were removed
 * as part of Starter Kit Forge Phase 0 (Requirements 0.2.1, 0.2.2, 0.2.4).
 * Server-side telemetry services (analyticsService, costTracker,
 * feedbackService, metricsService) are retained per Requirement 0.2.2.
 */

// Existing components
export { AIConsentDialog } from './AIConsentDialog';
export { AISettings } from './AISettings';
export { DesignSuggestions } from './DesignSuggestions';
export { PromptEnhancement } from './PromptEnhancement';
export { ChatInterface } from './ChatInterface';

// Conversation export (Task 17 residual – not a premium/upgrade surface)
export { ConversationExport } from './ConversationExport';

// Feedback components (Task 18) – kept: these collect feedback, they are not dashboards
export { FeedbackButtons } from './FeedbackButtons';
export { PromptOptimizationPanel } from './PromptOptimizationPanel';
