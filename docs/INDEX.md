# WebKnot Documentation Index

Welcome to the WebKnot documentation. This index lists every document currently
present under `docs/` after the Phase 0 consolidation.

## 📚 Quick Links

- [Main README](../README.md) - Project overview and getting started
- [Contributing Guide](../CONTRIBUTING.md) - How to contribute to the project
- [Changelog](../CHANGELOG.md) - Version history and changes

---

## 🎯 User Guides (`docs/guides/`)

Documents aimed at people using WebKnot to generate prompts.

- [User Guide](./guides/USER_GUIDE.md) - Step-by-step guide for creating website prompts with WebKnot.
- [FAQ](./guides/FAQ.md) - Quick answers to common questions about using WebKnot.
- [Troubleshooting](./guides/TROUBLESHOOTING.md) - Solutions to common issues, including the dynamic import error.
- [React-Bits Integration](./guides/REACT_BITS_INTEGRATION.md) - How the 93 react-bits components are integrated into the wizard.
- [React-Bits Quick Reference](./guides/REACT_BITS_QUICK_REFERENCE.md) - Quick reference for developers working with the react-bits integration.
- [React-Bits Usage Examples](./guides/REACT_BITS_USAGE_EXAMPLES.md) - Practical examples for implementing react-bits components.

---

## 🤖 AI Features & Product Docs (`docs/`)

Top-level product and AI-feature documentation.

- [AI Features Guide](./AI_FEATURES_GUIDE.md) - Overview of all AI-powered features and how to use them.
- [AI Algorithms](./AI_ALGORITHMS.md) - Technical reference for the AI algorithms behind the wizard.
- [AI FAQ](./AI_FAQ.md) - Frequently asked questions about AI in WebKnot.
- [AI In-App Help](./AI_IN_APP_HELP.md) - Contextual in-app help implementation for AI components.
- [AI Effectiveness Metrics](./AI_EFFECTIVENESS_METRICS.md) - Metrics system for measuring AI feature impact.
- [AI Performance Metrics](./AI_PERFORMANCE_METRICS.md) - Performance targets and measurements for AI operations.
- [Metrics Quick Reference](./METRICS_QUICK_REFERENCE.md) - Quick reference for the metrics dashboard and tracking.
- [Design Suggestions Integration](./DESIGN_SUGGESTIONS_INTEGRATION.md) - How AI-powered design suggestions plug into wizard steps.
- [Gemini AI Integration Analysis](./GEMINI_AI_INTEGRATION_ANALYSIS.md) - Analysis of the Gemini AI integration architecture.
- [Gemini Infrastructure Diagram](./GEMINI_INFRASTRUCTURE_DIAGRAM.md) - Infrastructure diagram for the Gemini integration.
- [Gemini Setup Complete](./GEMINI_SETUP_COMPLETE.md) - Summary of the Gemini integration infrastructure setup.
- [Gemini Version Update](./GEMINI_VERSION_UPDATE.md) - Notes on the upgrade from Gemini 2.0 to 2.5.
- [Privacy and Data Usage](./PRIVACY_AND_DATA_USAGE.md) - How user data is handled when AI features are used.
- [Premium Tier Benefits](./PREMIUM_TIER_BENEFITS.md) - Overview of Phase 3 premium tier features.
- [Prompt Optimization Guide](./PROMPT_OPTIMIZATION_GUIDE.md) - Guide to optimizing prompts for token efficiency.
- [Token Optimization](./TOKEN_OPTIMIZATION.md) - Token optimization strategies for the Gemini integration.
- [Token Optimization Comparison](./TOKEN_OPTIMIZATION_COMPARISON.md) - Before/after comparison of optimized prompts.
- [Queue Position Indicator](./QUEUE_POSITION_INDICATOR_EXAMPLE.md) - Visual examples of the queue position indicator.
- [Task 14.4 Cost Analysis](./TASK_14.4_COST_ANALYSIS.md) - Cost analysis for the Gemini AI integration.
- [Conversational AI Guide](./CONVERSATIONAL_AI_GUIDE.md) - Placeholder for conversational AI documentation (in progress).

---

## 🏗️ Architecture (`docs/`)

- [Architecture](./ARCHITECTURE.md) - System design, layers, and structure of the WebKnot app.
- [Phase 0 Completion Report](./PHASE_0_REPORT.md) - Before/after `node_modules` and gzipped main-chunk measurements for the Phase 0 dependency trim (Req 0.3, C.2.4).

---

## 🧑‍💻 Developer Reference (`docs/developer/`)

API and implementation references for developers working in the codebase.

- [GeminiService API](./developer/GEMINI_SERVICE_API.md) - API reference for the `GeminiService` class.
- [useGemini Hook](./developer/USE_GEMINI_HOOK.md) - Reference for the `useGemini` React hook.
- [Caching Strategy](./developer/CACHING_STRATEGY.md) - How the in-memory + localStorage LRU cache works.
- [Error Handling Patterns](./developer/ERROR_HANDLING_PATTERNS.md) - Hybrid error-handling patterns with rule-based fallback.

---

## 🚀 Deployment (`docs/deployment/`)

- [Production Deployment Guide](./deployment/PRODUCTION_DEPLOYMENT_GUIDE.md) - Step-by-step production deployment instructions for the Gemini integration.
- [Rollback Plan](./deployment/ROLLBACK_PLAN.md) - Procedures for rolling back the Gemini integration.

---

## 📋 Implementation Summaries (`docs/implementation/`)

Completion summaries for significant features and tasks.

- [Error Handling Implementation](./implementation/ERROR_HANDLING_IMPLEMENTATION.md) - Summary of AI-feature error handling.
- [Feedback Collection Summary](./implementation/FEEDBACK_COLLECTION_SUMMARY.md) - Summary of the user feedback and analytics system.
- [Performance Improvements Complete](./implementation/PERFORMANCE_IMPROVEMENTS_COMPLETE.md) - Summary of performance and code-quality improvements.
- [Visual Polish Summary](./implementation/VISUAL_POLISH_SUMMARY.md) - Summary of the visual polish pass.
- [Wizard Improvements Summary](./implementation/WIZARD_IMPROVEMENTS_SUMMARY.md) - Summary of wizard improvements from user feedback.
- [Task 11: Routing Integration](./implementation/TASK_11_COMPLETION_SUMMARY.md) - Completion summary for routing integration.
- [Task 12: AI Effectiveness Measurement](./implementation/TASK_12_COMPLETION_SUMMARY.md) - Completion summary for metrics tracking.
- [Task 14: AI Accessibility](./implementation/TASK_14_ACCESSIBILITY_SUMMARY.md) - Completion summary for WCAG 2.1 AA accessibility work.
- [Task 17: Documentation](./implementation/TASK_17_DOCUMENTATION_SUMMARY.md) - Completion summary for the React-Bits documentation task.

---

## 🧪 Testing (`docs/testing/`)

Test results and methodology records.

- [Accessibility Test Results](./testing/ACCESSIBILITY_TEST_RESULTS.md) - WCAG compliance test results for AI features.
- [E2E Test Results](./testing/E2E_TEST_RESULTS.md) - End-to-end test results for the React-Bits integration.
- [Integration Test Results](./testing/INTEGRATION_TEST_RESULTS.md) - Integration test results for the React-Bits integration.

---

## 📝 Contributor Notes

When adding a new document, place it in the folder that matches its audience:

- End-user guidance → `docs/guides/`
- Product / AI feature docs → `docs/` (root)
- Developer reference → `docs/developer/`
- Deployment / operations → `docs/deployment/`
- Completion summaries → `docs/implementation/`
- Test results → `docs/testing/`

Then add the new document to this index under the appropriate section so it
stays discoverable.

---

**Last updated:** Phase 0 consolidation (WebKnot rename, `docs/archived/` removed).
