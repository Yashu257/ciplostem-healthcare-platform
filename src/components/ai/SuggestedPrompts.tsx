import { motion } from 'framer-motion';
import { Sparkles, Activity, FileText, Microscope, Heart, TrendingUp } from 'lucide-react';
import type { UserType } from '@/services/aiApiService';

interface SuggestedPromptsProps {
  userType: UserType;
  onPromptClick: (prompt: string) => void;
}

const promptsByType = {
  patient: [
    { icon: Heart, text: 'Am I eligible for stem cell therapy?', category: 'Eligibility' },
    { icon: Activity, text: 'What is the recovery timeline?', category: 'Recovery' },
    { icon: FileText, text: 'What are the potential side effects?', category: 'Safety' },
    { icon: TrendingUp, text: 'What success rates can I expect?', category: 'Outcomes' },
    { icon: Microscope, text: 'How does stem cell therapy work?', category: 'Education' },
    { icon: Heart, text: 'What lifestyle changes should I make?', category: 'Lifestyle' }
  ],
  doctor: [
    { icon: FileText, text: 'Show me the latest clinical trial data', category: 'Research' },
    { icon: Activity, text: 'What are the WOMAC score improvements?', category: 'Outcomes' },
    { icon: Microscope, text: 'Explain the mechanism of action', category: 'Science' },
    { icon: TrendingUp, text: 'What are the contraindications?', category: 'Safety' },
    { icon: FileText, text: 'Describe the manufacturing process', category: 'Manufacturing' },
    { icon: Activity, text: 'What is the dosage protocol?', category: 'Protocol' }
  ],
  general: [
    { icon: Microscope, text: 'What is stem cell therapy?', category: 'Basics' },
    { icon: Activity, text: 'How effective is it for knee OA?', category: 'Effectiveness' },
    { icon: FileText, text: 'What conditions can be treated?', category: 'Conditions' },
    { icon: Heart, text: 'Is stem cell therapy safe?', category: 'Safety' },
    { icon: TrendingUp, text: 'What is the treatment process?', category: 'Process' },
    { icon: Microscope, text: 'What makes CiploStem different?', category: 'Platform' }
  ]
};

export function SuggestedPrompts({ userType, onPromptClick }: SuggestedPromptsProps) {
  const prompts = promptsByType[userType];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <Sparkles className="w-4 h-4 text-cyan-500" />
        <h3 className="text-sm font-semibold text-neutral-700">
          Suggested Questions
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {prompts.map((prompt, idx) => {
          const Icon = prompt.icon;
          
          return (
            <motion.button
              key={idx}
              onClick={() => onPromptClick(prompt.text)}
              className="group relative p-3 rounded-xl bg-white border border-neutral-200 hover:border-cyan-300 hover:bg-cyan-50/30 transition-all text-left overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-teal-500/0 group-hover:from-cyan-500/5 group-hover:to-teal-500/5 transition-all" />

              <div className="relative flex items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-100 to-teal-100 group-hover:from-cyan-200 group-hover:to-teal-200 flex items-center justify-center transition-all">
                  <Icon className="w-4 h-4 text-cyan-600" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-cyan-600 mb-1">
                    {prompt.category}
                  </div>
                  <div className="text-sm text-neutral-700 group-hover:text-neutral-900 font-medium leading-snug">
                    {prompt.text}
                  </div>
                </div>

                {/* Arrow icon */}
                <motion.div
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -5 }}
                  whileHover={{ x: 0 }}
                >
                  <svg
                    className="w-4 h-4 text-cyan-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
