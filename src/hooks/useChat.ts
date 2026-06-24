/**
 * useChat Hook
 *
 * Manages chat interface state and conversation history
 * Integrates with useGemini for AI responses and wizard context
 *
 * Phase 3: Conversational AI Assistant
 * Requirements: 6.1, 6.2, 6.4, 6.5
 */

import { useState, useCallback, useEffect } from 'react';
import { useAiChat } from './ai/useAiMutations';
import { useBoltBuilderStore } from '../stores/boltBuilderStore';
import type { ConversationMessage } from '../types/gemini';
import {
  loadConversationHistory,
  saveConversationHistory,
  clearHistoryOnReset,
  shouldSummarizeHistory,
  summarizeHistory,
} from '../utils/conversationManager';

interface UseChatResult {
  /**
   * Whether the chat interface is open
   */
  isOpen: boolean;

  /**
   * Opens the chat interface
   */
  openChat: () => void;

  /**
   * Closes the chat interface
   */
  closeChat: () => void;

  /**
   * Toggles the chat interface
   */
  toggleChat: () => void;

  /**
   * Conversation messages
   */
  messages: ConversationMessage[];

  /**
   * Sends a message and gets AI response
   */
  sendMessage: (message: string) => Promise<string>;

  /**
   * Whether AI is processing a message
   */
  isLoading: boolean;

  /**
   * Clears conversation history
   */
  clearHistory: () => void;
}

/**
 * Custom hook for managing chat interface
 * Handles conversation history, persistence, and AI integration
 */
export function useChat(): UseChatResult {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);

  const { sendChatMessage, isChatting } = useAiChat();
  const wizardContext = useBoltBuilderStore();

  // Load conversation history on mount
  useEffect(() => {
    const history = loadConversationHistory();
    setMessages(history);

    console.log('[useChat] Loaded conversation history:', {
      messageCount: history.length,
    });
  }, []);

  // Save conversation history when messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveConversationHistory(messages);
    }
  }, [messages]);

  // Clear history when wizard is reset
  useEffect(() => {
    // Listen for wizard reset events
    const handleReset = () => {
      console.log('[useChat] Wizard reset detected, clearing conversation history');
      clearHistoryOnReset();
      setMessages([]);
    };

    // Add event listener (if you implement a reset event)
    window.addEventListener('wizard-reset', handleReset);

    return () => {
      window.removeEventListener('wizard-reset', handleReset);
    };
  }, []);

  /**
   * Opens the chat interface
   */
  const openChat = useCallback(() => {
    setIsOpen(true);
    console.log('[useChat] Chat interface opened');
  }, []);

  /**
   * Closes the chat interface
   */
  const closeChat = useCallback(() => {
    setIsOpen(false);
    console.log('[useChat] Chat interface closed');
  }, []);

  /**
   * Toggles the chat interface
   */
  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
    console.log('[useChat] Chat interface toggled:', !isOpen);
  }, [isOpen]);

  /**
   * Sends a message and gets AI response
   */
  const sendMessage = useCallback(
    async (message: string): Promise<string> => {
      console.log('[useChat] Sending message:', message);

      // Add user message to history
      const userMessage: ConversationMessage = {
        role: 'user',
        content: message,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);

      try {
        // Build wizard state from context
        const wizardState = {
          projectInfo: wizardContext.projectInfo,
          selectedLayout: wizardContext.selectedLayout,
          selectedSpecialLayouts: wizardContext.selectedSpecialLayouts,
          selectedDesignStyle: wizardContext.selectedDesignStyle,
          selectedColorTheme: wizardContext.selectedColorTheme,
          selectedTypography: wizardContext.selectedTypography,
          selectedFunctionality: wizardContext.selectedFunctionality,
          selectedVisuals: wizardContext.selectedVisuals,
          backgroundSelection: wizardContext.backgroundSelection,
          selectedComponents: wizardContext.selectedComponents,
          selectedAnimations: wizardContext.selectedAnimations,
        };

        // Get AI response with wizard context
        // Note: chat method signature is (message, wizardState?, currentStep?)
        const response = await sendChatMessage({
          message,
          wizardState,
          currentStep: wizardContext.currentStep,
        });

        // Add assistant message to history
        const assistantMessage: ConversationMessage = {
          role: 'assistant',
          content: response,
          timestamp: Date.now(),
        };

        setMessages((prev) => {
          const updated = [...prev, assistantMessage];

          // Check if we should summarize history
          if (shouldSummarizeHistory(updated)) {
            console.log('[useChat] Summarizing conversation history');
            return summarizeHistory(updated);
          }

          return updated;
        });

        console.log('[useChat] Received AI response');

        return response;
      } catch (error) {
        console.error('[useChat] Failed to send message:', error);

        // Add error message
        const errorMessage: ConversationMessage = {
          role: 'assistant',
          content: 'Sorry, I encountered an error processing your message. Please try again.',
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, errorMessage]);

        throw error;
      }
    },
    [sendChatMessage, wizardContext]
  );

  /**
   * Clears conversation history
   */
  const clearHistory = useCallback(() => {
    console.log('[useChat] Clearing conversation history');
    clearHistoryOnReset();
    setMessages([]);
  }, []);

  return {
    isOpen,
    openChat,
    closeChat,
    toggleChat,
    messages,
    sendMessage,
    isLoading: isChatting,
    clearHistory,
  };
}
