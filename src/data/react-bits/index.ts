/**
 * React-Bits Data Module
 *
 * Central export point for all React-Bits component data.
 * This module re-exports background, component, and animation options
 * from their respective modular files.
 *
 * @module react-bits
 */

export { backgroundOptions } from './backgrounds';
export { componentOptions } from './components';
export { animationOptions } from './animations';

// Re-export types for convenience
export type { BackgroundOption, ComponentOption, AnimationOption } from '../../types';
