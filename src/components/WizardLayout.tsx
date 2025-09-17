import React, { useState } from 'react';
import { useBoltBuilder } from '../contexts/BoltBuilderContext';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import MainContent from './layout/MainContent';
import PreviewPanel from './layout/PreviewPanel';
import Footer from './layout/Footer';
import PromptModal from './modals/PromptModal';

const WizardLayout: React.FC = () => {
  const { generatePrompt, generateBasicPrompt, setPromptText, setPromptType, promptText, promptType } = useBoltBuilder();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

  const handleGeneratePrompt = () => {
    generatePromptType('detailed');
    setIsPromptModalOpen(true);
  };

  const generatePromptType = (type: 'basic' | 'detailed') => {
    const prompt = type === 'basic' ? generateBasicPrompt() : generatePrompt();
    setPromptText(prompt);
    setPromptType(type);
  };

  return (
    <div className="flex flex-col h-screen relative z-10">
      <Header 
        onGeneratePrompt={handleGeneratePrompt}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onTogglePreview={() => setIsPreviewOpen(!isPreviewOpen)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        <MainContent />
        
        <PreviewPanel 
          isOpen={isPreviewOpen} 
          onClose={() => setIsPreviewOpen(false)} 
        />
      </div>
      
      <Footer />
      
      <PromptModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        onSelectType={generatePromptType}
        promptText={promptText}
        promptType={promptType}
      />
    </div>
  );
};

export default WizardLayout;