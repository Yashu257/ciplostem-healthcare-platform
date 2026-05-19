import { motion } from 'framer-motion';
import { AIOrb } from './AIOrb';
import { User, Sparkles } from 'lucide-react';

interface MessageBubbleProps {
  content: string;
  sender: 'user' | 'assistant';
  timestamp?: string;
  sources?: Array<{ source: string; relevance: number | null }>;
  isTyping?: boolean;
}

export function MessageBubble({
  content,
  sender,
  timestamp,
  sources,
  isTyping = false
}: MessageBubbleProps) {
  const isUser = sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[85%] ${
        isUser ? 'ml-auto' : 'mr-auto'
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
            <User className="w-5 h-5 text-white" />
          </div>
        ) : (
          <AIOrb isTyping={isTyping} size="sm" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
        <motion.div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-br-md'
              : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-md shadow-sm'
          }`}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          {/* Message text */}
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {content}
          </div>

          {/* Sources for AI messages */}
          {!isUser && sources && sources.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.3 }}
              className="mt-3 pt-3 border-t border-neutral-200"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                <span className="text-xs font-medium text-neutral-600">
                  Sources from medical documents
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sources.map((source, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-cyan-50 text-cyan-700 text-xs font-medium"
                  >
                    {source.source}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Timestamp */}
        {timestamp && (
          <span className="text-xs text-neutral-400 px-1">{timestamp}</span>
        )}
      </div>
    </motion.div>
  );
}
