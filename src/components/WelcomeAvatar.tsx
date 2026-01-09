import { useState, useEffect } from 'react';
import { Bot, X } from 'lucide-react';

const MESSAGES = [
  '👋 Welcome to HealthCart!',
  '🤖 Try SwastikaCure AI for quick health insights.',
  '🩺 Consult verified doctors anytime.',
  '💙 Your health, simplified.',
];

export default function WelcomeAvatar() {
  const [isVisible, setIsVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Show on every page reload
    setIsVisible(true);
    setMessageIndex(0);

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % MESSAGES.length);
    }, 2500);

    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
      clearInterval(messageInterval);
    }, 6000); // visible for a short time

    return () => {
      clearInterval(messageInterval);
      clearTimeout(hideTimeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">

      {/* Message Bubble */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 max-w-xs animate-slide-up">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="text-gray-800 dark:text-slate-100 text-sm leading-relaxed">
          {MESSAGES[messageIndex]}
        </p>

        {/* Bubble tail */}
        <div className="absolute bottom-3 -right-2 w-3 h-3 bg-white dark:bg-slate-800 rotate-45 shadow-sm" />
      </div>

      {/* AI Avatar */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-slate-600 dark:to-slate-500 rounded-full p-4 shadow-lg hover:scale-105 transition cursor-pointer">
        <Bot className="h-6 w-6 text-white" />
      </div>
    </div>
  );
}
