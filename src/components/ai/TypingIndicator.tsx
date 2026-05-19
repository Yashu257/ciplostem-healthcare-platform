import { motion } from 'framer-motion';
import { AIOrb } from './AIOrb';

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3 max-w-[85%] mr-auto"
    >
      <AIOrb isTyping size="sm" />
      
      <div className="bg-white border border-neutral-200 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500"
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-500 ml-1">
            AI is analyzing medical data...
          </span>
        </div>
      </div>
    </motion.div>
  );
}
