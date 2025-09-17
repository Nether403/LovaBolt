import React, { useState } from 'react';
import AboutModal from '../modals/AboutModal';
import HelpModal from '../modals/HelpModal';

const Footer: React.FC = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <footer className="bg-black/50 backdrop-blur-md border-t border-white/10 p-4 text-center">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="mb-2 md:mb-0 text-gray-300">
            © 2025 LovaBolt - Advanced Prompt Generator
          </p>
          <div className="space-x-4">
            <button 
              onClick={() => setShowAbout(true)}
              className="text-gray-300 hover:text-teal-400 transition-colors"
            >
              About LovaBolt
            </button>
            <button 
              onClick={() => setShowHelp(true)}
              className="text-gray-300 hover:text-teal-400 transition-colors"
            >
              Help
            </button>
            <a 
              href="mailto:hello@lovabolt.com" 
              className="text-gray-300 hover:text-teal-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
      
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </>
  );
};

export default Footer;