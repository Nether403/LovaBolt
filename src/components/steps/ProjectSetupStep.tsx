import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { z } from 'zod';
import { useBoltBuilder } from '../../contexts/BoltBuilderContext';
import { Button } from '../ui/button';
import InfoModal from '../modals/InfoModal';
import DescriptionHelpModal from '../modals/DescriptionHelpModal';

// Zod validation schema
const projectSetupSchema = z.object({
  name: z.string()
    .min(1, 'Project name is required')
    .min(3, 'Project name must be at least 3 characters')
    .max(100, 'Project name must be less than 100 characters'),
  description: z.string()
    .min(1, 'Project description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  type: z.string(),
  purpose: z.string(),
  targetAudience: z.string().optional(),
});

const ProjectSetupStep: React.FC = () => {
  const { projectInfo, setProjectInfo, setCurrentStep } = useBoltBuilder();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showDescriptionHelp, setShowDescriptionHelp] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate with Zod
    const result = projectSetupSchema.safeParse(projectInfo);

    if (!result.success) {
      // Extract errors from Zod validation
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    // Clear errors and proceed
    setErrors({});
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setCurrentStep('layout');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-3xl font-bold text-white">Project Setup</h2>
        <button
          onClick={() => setShowInfoModal(true)}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
        >
          <Info size={18} className="text-purple-400 group-hover:text-purple-300 transition-colors" />
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-white/10 border-l-4 border-white/40 text-white p-4 mb-6 rounded animate-fade-in backdrop-blur-sm">
          <p>Project saved successfully!</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-card rounded-lg shadow p-6 space-y-6">
        {/* Project Name */}
        <div>
          <label htmlFor="project-name" className="block text-sm font-medium text-gray-300 mb-1">
            Project/Website Name *
          </label>
          <input
            id="project-name"
            type="text"
            value={projectInfo.name}
            onChange={(e) => setProjectInfo({ ...projectInfo, name: e.target.value })}
            className={`
              w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-gray-400
              focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
              transition-all duration-200
              ${errors.name ? 'border-red-500/50' : 'border-white/20'}
            `}
            placeholder="e.g. The Photography Co"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Project Description */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <label htmlFor="project-description" className="block text-sm font-medium text-gray-300">
              Project Description *
            </label>
            <button
              type="button"
              onClick={() => setShowDescriptionHelp(true)}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
            >
              <Info size={16} className="text-purple-400 group-hover:text-purple-300 transition-colors" />
            </button>
          </div>
          <textarea
            id="project-description"
            value={projectInfo.description}
            onChange={(e) => setProjectInfo({ ...projectInfo, description: e.target.value })}
            rows={4}
            className={`
              w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-gray-400
              focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
              transition-all duration-200 resize-none
              ${errors.description ? 'border-red-500/50' : 'border-white/20'}
            `}
            placeholder="A modern portfolio website to showcase my photography work and attract potential clients..."
          />
          <div className="flex justify-between items-center mt-1">
            {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}
            <p className="text-gray-400 text-xs ml-auto">
              {projectInfo.description.length}/500
            </p>
          </div>
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="project-type" className="block text-sm font-medium text-gray-300 mb-1">
            Type of Project
          </label>
          <select
            id="project-type"
            value={projectInfo.type}
            onChange={(e) => setProjectInfo({ ...projectInfo, type: e.target.value as any })}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border-white/20 text-white border
                     focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                     transition-all duration-200
                     [&>option]:bg-gray-800 [&>option]:text-white"
          >
            <option value="Website">Website</option>
            <option value="Web App">Web App</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Dashboard">Dashboard</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Portfolio">Portfolio</option>
          </select>
        </div>

        {/* Purpose */}
        <div>
          <label htmlFor="website-purpose" className="block text-sm font-medium text-gray-300 mb-1">
            Primary Purpose
          </label>
          <select
            id="website-purpose"
            value={projectInfo.purpose}
            onChange={(e) => setProjectInfo({ ...projectInfo, purpose: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border-white/20 text-white border
                     focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                     transition-all duration-200
                     [&>option]:bg-gray-800 [&>option]:text-white"
          >
            <option value="Portfolio">Portfolio</option>
            <option value="Business">Business</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Personal">Personal</option>
            <option value="Blog">Blog</option>
            <option value="Social Media">Social Media</option>
            <option value="Education">Education</option>
            <option value="News and Entertainment">News and Entertainment</option>
            <option value="Events">Events</option>
            <option value="Non-profit">Non-profit</option>
          </select>
        </div>

        {/* Target Audience (Optional) */}
        <div>
          <label htmlFor="target-audience" className="block text-sm font-medium text-gray-300 mb-1">
            Target Audience <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            id="target-audience"
            type="text"
            value={projectInfo.targetAudience || ''}
            onChange={(e) => setProjectInfo({ ...projectInfo, targetAudience: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border-white/20 text-white placeholder-gray-400 border
                     focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                     transition-all duration-200"
            placeholder="e.g. Small business owners, creative professionals..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button type="submit">
            Save & Continue
          </Button>
        </div>
      </form>

      {/* Modals */}
      <InfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} />
      <DescriptionHelpModal isOpen={showDescriptionHelp} onClose={() => setShowDescriptionHelp(false)} />
    </div>
  );
};

export default ProjectSetupStep;