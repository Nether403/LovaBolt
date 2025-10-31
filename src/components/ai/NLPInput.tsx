import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { parseProjectDescription, NLPParseResult } from '../../utils/nlpParser';
import { ProjectInfo, DesignStyle, ColorTheme } from '../../types';

interface NLPInputProps {
  onApplyDetections: (result: NLPParseResult) => void;
  currentProjectInfo?: ProjectInfo; // eslint-disable-line @typescript-eslint/no-unused-vars
  currentDesignStyle?: DesignStyle; // eslint-disable-line @typescript-eslint/no-unused-vars
  currentColorTheme?: ColorTheme; // eslint-disable-line @typescript-eslint/no-unused-vars
}

/**
 * NLPInput component allows users to describe their project in natural language
 * and automatically detects project type, design style, and color theme preferences.
 */
export const NLPInput: React.FC<NLPInputProps> = ({
  onApplyDetections,
  currentProjectInfo,
  currentDesignStyle,
  currentColorTheme
}) => {
  const [description, setDescription] = useState('');
  const [parseResult, setParseResult] = useState<NLPParseResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Debounced parsing
  useEffect(() => {
    if (description.trim().length < 10) {
      setParseResult(null);
      return;
    }

    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      const result = parseProjectDescription(description);
      setParseResult(result);
      setIsAnalyzing(false);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [description]);

  const handleApply = () => {
    if (parseResult) {
      onApplyDetections(parseResult);
    }
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.7) return 'text-green-400';
    if (confidence >= 0.5) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getConfidenceLabel = (confidence: number): string => {
    if (confidence >= 0.7) return 'High';
    if (confidence >= 0.5) return 'Medium';
    return 'Low';
  };

  const hasDetections = parseResult && (
    parseResult.projectType ||
    parseResult.designStyle ||
    parseResult.colorTheme
  );

  const hasHighConfidenceDetections = parseResult && (
    (parseResult.confidence['projectType'] && parseResult.confidence['projectType'] > 0.5) ||
    (parseResult.confidence['designStyle'] && parseResult.confidence['designStyle'] > 0.5) ||
    (parseResult.confidence['colorTheme'] && parseResult.confidence['colorTheme'] > 0.5)
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-teal-400" />
        <h3 className="text-lg font-semibold text-white">
          Describe Your Project
        </h3>
      </div>

      <p className="text-sm text-gray-400">
        Tell us about your project in your own words, and we'll automatically detect your preferences.
      </p>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Example: I want to build a minimalist portfolio website with clean blue colors to showcase my design work..."
          className="w-full h-32 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
          aria-label="Project description"
        />
        
        {isAnalyzing && (
          <div className="absolute bottom-3 right-3 flex items-center gap-2 text-sm text-gray-400">
            <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
            <span>Analyzing...</span>
          </div>
        )}
      </div>

      {/* Detected Selections */}
      {hasDetections && !isAnalyzing && (
        <div className="glass-card p-4 rounded-xl space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-teal-400" />
            <h4 className="text-sm font-semibold text-white">
              Detected Preferences
            </h4>
          </div>

          <div className="space-y-2">
            {/* Project Type */}
            {parseResult.projectType && parseResult.confidence['projectType'] && (
              <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-gray-300">
                    <span className="text-gray-500">Project Type:</span>{' '}
                    <span className="font-medium text-white">{parseResult.projectType}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 transition-all duration-300"
                      style={{ width: `${parseResult.confidence['projectType'] * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${getConfidenceColor(parseResult.confidence['projectType'])}`}>
                    {getConfidenceLabel(parseResult.confidence['projectType'])}
                  </span>
                </div>
              </div>
            )}

            {/* Design Style */}
            {parseResult.designStyle && parseResult.confidence['designStyle'] && (
              <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-gray-300">
                    <span className="text-gray-500">Design Style:</span>{' '}
                    <span className="font-medium text-white capitalize">
                      {parseResult.designStyle.replace(/-/g, ' ')}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 transition-all duration-300"
                      style={{ width: `${parseResult.confidence['designStyle'] * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${getConfidenceColor(parseResult.confidence['designStyle'])}`}>
                    {getConfidenceLabel(parseResult.confidence['designStyle'])}
                  </span>
                </div>
              </div>
            )}

            {/* Color Theme */}
            {parseResult.colorTheme && parseResult.confidence['colorTheme'] && (
              <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-gray-300">
                    <span className="text-gray-500">Color Theme:</span>{' '}
                    <span className="font-medium text-white capitalize">
                      {parseResult.colorTheme.replace(/-/g, ' ')}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 transition-all duration-300"
                      style={{ width: `${parseResult.confidence['colorTheme'] * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${getConfidenceColor(parseResult.confidence['colorTheme'])}`}>
                    {getConfidenceLabel(parseResult.confidence['colorTheme'])}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Apply Button */}
          {hasHighConfidenceDetections && (
            <button
              onClick={handleApply}
              className="w-full mt-3 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Apply detected settings"
            >
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">Start with these settings</span>
            </button>
          )}

          {/* Low Confidence Warning */}
          {!hasHighConfidenceDetections && (
            <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-yellow-400">
                We detected some preferences but with low confidence. Try adding more details about your project for better results.
              </p>
            </div>
          )}
        </div>
      )}

      {/* No Detections Message */}
      {description.trim().length >= 10 && !hasDetections && !isAnalyzing && (
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5" />
            <p className="text-sm text-gray-400">
              No clear preferences detected. Try describing your project type (e.g., "portfolio", "e-commerce"), 
              design style (e.g., "minimalist", "modern"), or color preferences (e.g., "blue", "warm colors").
            </p>
          </div>
        </div>
      )}

      {/* Help Text */}
      {description.trim().length < 10 && (
        <div className="text-xs text-gray-500">
          <p className="mb-1">💡 <strong>Tips for better detection:</strong></p>
          <ul className="list-disc list-inside space-y-0.5 ml-2">
            <li>Mention your project type (portfolio, e-commerce, dashboard, etc.)</li>
            <li>Describe the design style you prefer (minimalist, modern, elegant, etc.)</li>
            <li>Include color preferences (blue, warm, monochrome, neon, etc.)</li>
          </ul>
        </div>
      )}
    </div>
  );
};
