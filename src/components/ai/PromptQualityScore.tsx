/**
 * PromptQualityScore Component
 * 
 * Displays prompt quality analysis with score, strengths, weaknesses, and suggestions.
 * Allows users to apply auto-fixable recommendations to improve their prompt.
 */

import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { PromptAnalysisResult } from '../../utils/promptAnalyzer';
import { Button } from '../ui/button';

export interface PromptQualityScoreProps {
  analysis: PromptAnalysisResult;
  onApplyFixes: () => void;
  className?: string;
}

/**
 * Get color class based on score
 */
const getScoreColor = (score: number): string => {
  if (score >= 85) return 'text-green-500';
  if (score >= 70) return 'text-yellow-500';
  return 'text-red-500';
};

/**
 * Get score label based on score
 */
const getScoreLabel = (score: number): string => {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  return 'Needs Improvement';
};

/**
 * Get progress bar color based on score
 */
const getProgressBarColor = (score: number): string => {
  if (score >= 85) return 'bg-green-500';
  if (score >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
};

/**
 * Get severity icon
 */
const getSeverityIcon = (type: string): string => {
  if (type === 'warning') return '⚠';
  if (type === 'tip') return '💡';
  return 'ℹ';
};

/**
 * Get severity color
 */
const getSeverityColor = (severity: string): string => {
  if (severity === 'high') return 'text-red-500';
  if (severity === 'medium') return 'text-yellow-500';
  return 'text-blue-500';
};

export const PromptQualityScore: React.FC<PromptQualityScoreProps> = ({
  analysis,
  onApplyFixes,
  className = '',
}) => {
  return (
    <div className={`glass-card p-6 rounded-xl ${className}`}>
      {/* Header with Score */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Prompt Quality</h3>
        <div className="flex items-center gap-2">
          <span className={`text-3xl font-bold ${getScoreColor(analysis.score)}`}>
            {analysis.score}
          </span>
          <span className="text-gray-400">/100</span>
        </div>
      </div>

      {/* Score Label and Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">{getScoreLabel(analysis.score)}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(analysis.score)}`}
            style={{ width: `${analysis.score}%` }}
          />
        </div>
      </div>

      {/* Strengths Section */}
      {analysis.strengths.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Strengths
          </h4>
          <ul className="space-y-1">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions Section */}
      {analysis.suggestions.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-yellow-400 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Suggestions
          </h4>
          <ul className="space-y-2">
            {analysis.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm">
                <div className="flex items-start gap-2">
                  <span className={`mt-1 ${getSeverityColor(suggestion.severity)}`}>
                    {getSeverityIcon(suggestion.type)}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-300">{suggestion.message}</p>
                    {suggestion.fix && (
                      <p className="text-gray-500 text-xs mt-1">Fix: {suggestion.fix}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Apply Recommendations Button */}
          {analysis.optimizedPrompt && (
            <Button
              onClick={onApplyFixes}
              className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white"
            >
              Apply Recommendations
            </Button>
          )}
        </div>
      )}

      {/* Perfect Score Message */}
      {analysis.suggestions.length === 0 && analysis.score >= 90 && (
        <div className="text-center py-4">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-green-400">Excellent prompt quality!</p>
          <p className="text-xs text-gray-400">Your prompt follows all best practices</p>
        </div>
      )}
    </div>
  );
};
