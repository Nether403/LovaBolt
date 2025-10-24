import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cuboid } from 'lucide-react';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const codeSnippets = [
    'const app = createApp();',
    'import { useState } from "react";',
    'function BoltComponent() {',
    'npm install @bolt/core',
    'export default function App()',
    '<div className="flex">',
    'const [state, setState] =',
    'useEffect(() => {',
    'tailwind.config.js',
    'git commit -m "init"'
  ];

  const getRandomSnippet = () => {
    return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleGetStarted = () => {
    setIsLoading(true);
    let count = 0;

    intervalRef.current = setInterval(() => {
      setCurrentText(getRandomSnippet());
      count++;

      if (count >= 4) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsLoading(false);
          navigate('/wizard');
        }, 500);
      }
    }, 500);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Logo and Branding */}
      <div className="mb-8 animate-slide-up">
        <div className="mb-6">
          <Cuboid className="w-24 h-24 text-blue-400 mx-auto rotate-12 transform-gpu hover:rotate-45 transition-transform duration-500" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight text-gradient">
          LovaBolt
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-2">
          <em>Advanced Prompt Generator</em>
        </p>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Create comprehensive website design prompts for AI development tools like
          <span className="text-blue-400 font-semibold"> Bolt.new</span> and
          <span className="text-purple-400 font-semibold"> Lovable.dev</span>
        </p>
      </div>

      {/* Features Preview */}
      <div className="mb-12 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Smart Wizard</h3>
            <p className="text-gray-300 text-sm">Intelligent step-by-step guidance through design decisions</p>
          </div>

          <div className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Live Preview</h3>
            <p className="text-gray-300 text-sm">Real-time visualization of your design choices</p>
          </div>

          <div className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Perfect Prompts</h3>
            <p className="text-gray-300 text-sm">Detailed prompts optimized for AI development tools</p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <button
          onClick={handleGetStarted}
          disabled={isLoading}
          className={`
            relative px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
            rounded-xl border border-white/20 transition-all duration-300 
            hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]
            disabled:opacity-50 disabled:cursor-not-allowed
            font-semibold text-lg
            ${isLoading ? 'w-80' : 'w-auto'}
          `}
        >
          {!isLoading && (
            <span className="text-white flex items-center gap-3">
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          )}
          {isLoading && (
            <span className="absolute inset-0 flex items-center justify-center text-sm text-blue-300 font-mono">
              {currentText}
            </span>
          )}
        </button>
      </div>

      {/* Additional Info */}
      <div className="mt-16 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <div className="glass-card rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Why LovaBolt?</h2>
          <p className="text-gray-300 leading-relaxed">
            Transform your website ideas into detailed, actionable prompts that AI development tools can understand perfectly.
            Our advanced wizard guides you through every design decision, ensuring your vision is captured with precision
            and translated into professional development requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;