import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AIOrbProps {
  isTyping?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function AIOrb({ isTyping = false, size = 'md' }: AIOrbProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className="relative">
      {/* Outer glow ring */}
      <motion.div
        className={`${sizeClasses[size]} rounded-full absolute inset-0`}
        animate={{
          boxShadow: isTyping
            ? [
                '0 0 20px rgba(6, 182, 212, 0.4)',
                '0 0 40px rgba(6, 182, 212, 0.6)',
                '0 0 20px rgba(6, 182, 212, 0.4)',
              ]
            : '0 0 20px rgba(6, 182, 212, 0.3)',
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main orb */}
      <motion.div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-cyan-400 via-teal-500 to-cyan-600 flex items-center justify-center relative overflow-hidden`}
        animate={{
          scale: isTyping ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Icon */}
        <motion.div
          animate={{
            rotate: isTyping ? 360 : 0,
          }}
          transition={{
            duration: 3,
            repeat: isTyping ? Infinity : 0,
            ease: 'linear',
          }}
        >
          <Sparkles className={`${iconSizes[size]} text-white relative z-10`} />
        </motion.div>
      </motion.div>

      {/* Particle effects when typing */}
      {isTyping && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (i - 1) * 20],
                y: [0, -20 - i * 10],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
              style={{
                left: '50%',
                top: '50%',
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
