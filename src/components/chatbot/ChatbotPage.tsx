import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';
import { ContentWrapper } from '@/components/ui';
import { MessageBubble } from '@/components/ai/MessageBubble';
import { TypingIndicator } from '@/components/ai/TypingIndicator';
import { UserTypeSelector } from '@/components/ai/UserTypeSelector';
import { SuggestedPrompts } from '@/components/ai/SuggestedPrompts';
import { QuickTopics } from '@/components/ai/QuickTopics';
import { AIStatsPanel } from '@/components/ai/AIStatsPanel';
import { AIOrb } from '@/components/ai/AIOrb';
import { aiApiService, type UserType } from '@/services/aiApiService';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  sources?: Array<{ source: string; relevance: number | null }>;
}

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  content: "Welcome to CiploStem Advanced AI Healthcare Assistant! I'm powered by cutting-edge RAG technology with access to comprehensive medical documentation about stem cell therapy for Knee Osteoarthritis.\n\nI can help you with:\n• Clinical evidence and trial data\n• Treatment eligibility and protocols\n• WOMAC and VAS score analysis\n• Manufacturing processes\n• Patient guidance and doctor support\n\nHow can I assist you today?",
  sender: 'assistant',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userType, setUserType] = useState<UserType>('general');
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    // Check backend connection
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const stats = await aiApiService.getDocumentStats();
      setIsConnected(stats !== null);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setError(null);
    const userMsg: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await aiApiService.sendMessage(text, userType);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: response.sources,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsConnected(true);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to connect to AI backend. Please ensure the backend server is running.');
      setIsConnected(false);
      
      // Add fallback message
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm currently unable to connect to the AI backend. Please ensure the backend server is running on http://localhost:5000. You can start it by running 'npm run dev' in the backend directory.",
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    aiApiService.clearChatHistory();
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative pt-24 pb-8">
        <ContentWrapper>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <AIOrb size="lg" />
                <div>
                  <h1 className="text-2xl font-bold text-neutral-800">
                    Advanced AI Healthcare Assistant
                  </h1>
                  <p className="text-sm text-neutral-600 mt-1">
                    Powered by RAG • Medical Knowledge Base • Real-time Analysis
                  </p>
                </div>
              </div>

              {/* Connection status */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-xs font-medium text-neutral-700">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Error banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-800 font-medium">Connection Error</p>
                  <p className="text-xs text-red-600 mt-1">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid lg:grid-cols-[1fr_400px] gap-6">
            {/* Main chat area */}
            <div className="flex flex-col">
              {/* Chat container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col bg-white/80 backdrop-blur-xl rounded-2xl border border-neutral-200/50 shadow-2xl overflow-hidden h-[calc(100vh-240px)]"
              >
                {/* Chat header */}
                <div className="relative bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-600 p-5">
                  {/* Animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AIOrb isTyping={isTyping} size="md" />
                      <div>
                        <h2 className="text-lg font-bold text-white">
                          CiploStem AI Assistant
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <Sparkles className="w-3 h-3 text-cyan-200" />
                          <span className="text-sm text-cyan-100">
                            {userType === 'patient' ? 'Patient Mode' : userType === 'doctor' ? 'Doctor Mode' : 'General Mode'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleClearChat}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Clear
                    </button>
                  </div>
                </div>

                {/* Messages area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-neutral-50/50 to-white/50">
                  <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                      <MessageBubble
                        key={msg.id}
                        content={msg.content}
                        sender={msg.sender}
                        timestamp={msg.timestamp}
                        sources={msg.sources}
                      />
                    ))}
                  </AnimatePresence>

                  {isTyping && <TypingIndicator />}
                  <div ref={chatEndRef} />
                </div>

                {/* Input area */}
                <div className="p-4 border-t border-neutral-200 bg-white/80 backdrop-blur-sm">
                  <form onSubmit={handleSubmit} className="flex items-end gap-3">
                    <div className="flex-1">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about stem cell therapy, clinical evidence, treatment protocols..."
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 bg-white transition-all"
                        disabled={isTyping}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!input.trim() || isTyping}
                      className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-240px)]">
              {/* User type selector */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 backdrop-blur-xl rounded-xl border border-neutral-200/50 p-5 shadow-lg"
              >
                <UserTypeSelector
                  selectedType={userType}
                  onTypeChange={setUserType}
                />
              </motion.div>

              {/* Suggested prompts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-xl rounded-xl border border-neutral-200/50 p-5 shadow-lg"
              >
                <SuggestedPrompts
                  userType={userType}
                  onPromptClick={handlePromptClick}
                />
              </motion.div>

              {/* Quick topics */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-xl rounded-xl border border-neutral-200/50 p-5 shadow-lg"
              >
                <QuickTopics onTopicClick={sendMessage} />
              </motion.div>

              {/* AI Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <AIStatsPanel />
              </motion.div>

              {/* Disclaimer */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4 bg-amber-50 rounded-xl border border-amber-200"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    This AI provides educational information based on medical documentation. Always consult healthcare professionals for medical decisions.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </main>
  );
}
