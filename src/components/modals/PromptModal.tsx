import React, { useState } from 'react';
import { Copy, ExternalLink, Check, X } from 'lucide-react';
import { Button } from '../ui/button';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: 'basic' | 'detailed') => void;
  promptText: string;
  promptType: 'basic' | 'detailed';
}

const PromptModal: React.FC<PromptModalProps> = ({
  isOpen,
  onClose,
  onSelectType,
  promptText,
  promptType
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAndGo = (url: string) => {
    navigator.clipboard.writeText(promptText).then(() => {
      window.open(url, '_blank');
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl p-6">
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none" />
          
          <div className="relative">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Generated Prompt</h2>
                <button
                  className="text-white/80 hover:text-white transition-colors"
                  onClick={onClose}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => onSelectType('basic')}
                  className={`text-sm ${promptType === 'basic' ? 'bg-teal-600 hover:bg-teal-700' : ''}`}
                  size="sm"
                >
                  Basic
                </Button>
                <Button
                  onClick={() => onSelectType('detailed')}
                  className={`text-sm ${promptType === 'detailed' ? 'bg-teal-600 hover:bg-teal-700' : ''}`}
                  size="sm"
                >
                  Detailed
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <pre className="whitespace-pre-wrap bg-black/20 p-4 rounded-lg border border-white/10 text-gray-300 text-sm font-mono mb-6 max-h-[60vh] overflow-y-auto">
                {promptText}
              </pre>
              
              <div className="flex justify-end gap-3 flex-wrap">
                <Button
                  onClick={handleCopy}
                  className="flex items-center bg-white/10 hover:bg-white/20 text-white"
                >
                  {copied ? (
                    <>
                      <Check size={18} className="mr-2 text-teal-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={18} className="mr-2" />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={() => handleCopyAndGo('https://bolt.new')}
                  className="flex items-center bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <ExternalLink size={18} className="mr-2" />
                  Copy & Go to Bolt
                </Button>
                
                <Button
                  onClick={() => handleCopyAndGo('https://lovable.dev')}
                  className="flex items-center bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <ExternalLink size={18} className="mr-2" />
                  Copy & Go to Lovable
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptModal;