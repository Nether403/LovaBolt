import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { CompatibilityResult, CompatibilityIssue } from '../../utils/compatibilityChecker';
import { Button } from '../ui/button';

export interface CompatibilityIndicatorProps {
  compatibility: CompatibilityResult;
  onAutoFix?: (issue: CompatibilityIssue) => void;
  className?: string;
}

/**
 * CompatibilityIndicator displays the Design Harmony score and compatibility issues
 * Shows color-coded score, issues with severity indicators, and auto-fix options
 */
export const CompatibilityIndicator: React.FC<CompatibilityIndicatorProps> = ({
  compatibility,
  onAutoFix,
  className = '',
}) => {
  const getHarmonyColor = (harmony: string): string => {
    switch (harmony) {
      case 'excellent':
        return 'text-green-500';
      case 'good':
        return 'text-teal-500';
      case 'fair':
        return 'text-yellow-500';
      case 'poor':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getHarmonyIcon = (harmony: string): JSX.Element => {
    switch (harmony) {
      case 'excellent':
        return <CheckCircle className="w-6 h-6" />;
      case 'good':
        return <CheckCircle className="w-6 h-6" />;
      case 'fair':
        return <AlertCircle className="w-6 h-6" />;
      case 'poor':
        return <XCircle className="w-6 h-6" />;
      default:
        return <AlertCircle className="w-6 h-6" />;
    }
  };

  const getHarmonyLabel = (harmony: string): string => {
    return harmony.charAt(0).toUpperCase() + harmony.slice(1);
  };

  return (
    <div className={`glass-card p-4 rounded-xl ${className}`}>
      {/* Header with Score */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">Design Harmony</h3>
        <div className="flex items-center gap-2">
          <span className={`text-2xl font-bold ${getHarmonyColor(compatibility.harmony)}`}>
            {compatibility.score}
          </span>
          <span className={getHarmonyColor(compatibility.harmony)}>
            {getHarmonyIcon(compatibility.harmony)}
          </span>
        </div>
      </div>

      {/* Harmony Level Label */}
      <div className="mb-4">
        <span className={`text-sm font-medium ${getHarmonyColor(compatibility.harmony)}`}>
          {getHarmonyLabel(compatibility.harmony)}
        </span>
      </div>

      {/* Issues Section */}
      {compatibility.issues.length > 0 && (
        <div className="space-y-2 mb-3">
          <h4 className="text-xs font-medium text-red-400 uppercase tracking-wide">Issues</h4>
          {compatibility.issues.map((issue, index) => (
            <div key={index} className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <div className="flex items-start gap-2 mb-1">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-300 flex-1">{issue.message}</p>
              </div>
              <p className="text-xs text-gray-400 ml-6 mb-2">{issue.suggestion}</p>
              {issue.autoFixable && onAutoFix && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAutoFix(issue)}
                  className="ml-6 text-xs h-7 border-red-500/30 hover:bg-red-500/10 text-red-300"
                >
                  Auto-Fix
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Warnings Section */}
      {compatibility.warnings.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-yellow-400 uppercase tracking-wide">Warnings</h4>
          {compatibility.warnings.map((warning, index) => (
            <div
              key={index}
              className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3"
            >
              <div className="flex items-start gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-300 flex-1">{warning.message}</p>
              </div>
              <p className="text-xs text-gray-400 ml-6">{warning.suggestion}</p>
            </div>
          ))}
        </div>
      )}

      {/* Perfect Harmony State */}
      {compatibility.issues.length === 0 && compatibility.warnings.length === 0 && (
        <div className="text-center py-4">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-green-400 font-medium">Perfect harmony!</p>
          <p className="text-xs text-gray-400 mt-1">Your selections work great together</p>
        </div>
      )}
    </div>
  );
};

export default CompatibilityIndicator;
