import { motion } from 'framer-motion';
import { 
  Activity, 
  Microscope, 
  FileText, 
  Heart, 
  TrendingUp, 
  Shield,
  Zap,
  Users
} from 'lucide-react';

interface QuickTopicsProps {
  onTopicClick: (topic: string) => void;
}

const topics = [
  {
    icon: Microscope,
    title: 'Stem Cell Science',
    description: 'How regenerative medicine works',
    query: 'Explain the science behind stem cell therapy for knee osteoarthritis',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Activity,
    title: 'Clinical Evidence',
    description: 'Research and trial outcomes',
    query: 'What clinical evidence supports stem cell therapy for knee OA?',
    gradient: 'from-cyan-500 to-teal-500'
  },
  {
    icon: Heart,
    title: 'Patient Journey',
    description: 'Treatment process overview',
    query: 'Walk me through the complete patient treatment journey',
    gradient: 'from-teal-500 to-emerald-500'
  },
  {
    icon: TrendingUp,
    title: 'Success Metrics',
    description: 'WOMAC & VAS scores',
    query: 'What are the typical WOMAC and VAS score improvements?',
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    icon: Shield,
    title: 'Safety Profile',
    description: 'Side effects & contraindications',
    query: 'What are the safety considerations and contraindications?',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Zap,
    title: 'Manufacturing',
    description: 'Quality & production process',
    query: 'Describe the manufacturing and quality control process',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: FileText,
    title: 'Eligibility',
    description: 'Who qualifies for treatment',
    query: 'What are the eligibility criteria for stem cell therapy?',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Users,
    title: 'For Doctors',
    description: 'Clinical protocols & data',
    query: 'Provide detailed clinical information for healthcare providers',
    gradient: 'from-pink-500 to-rose-500'
  }
];

export function QuickTopics({ onTopicClick }: QuickTopicsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <div className="w-1 h-4 rounded-full bg-gradient-to-b from-cyan-500 to-teal-500" />
        <h3 className="text-sm font-semibold text-neutral-700">
          Quick Topics
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {topics.map((topic, idx) => {
          const Icon = topic.icon;
          
          return (
            <motion.button
              key={idx}
              onClick={() => onTopicClick(topic.query)}
              className="group relative p-4 rounded-xl bg-white border border-neutral-200 hover:border-transparent hover:shadow-lg transition-all text-left overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient background on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
              />

              <div className="relative flex items-center gap-3">
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-neutral-800 group-hover:text-neutral-900 mb-0.5">
                    {topic.title}
                  </div>
                  <div className="text-xs text-neutral-500 group-hover:text-neutral-600">
                    {topic.description}
                  </div>
                </div>

                {/* Arrow */}
                <motion.div
                  className="flex-shrink-0"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  <svg
                    className="w-5 h-5 text-neutral-400 group-hover:text-cyan-500 transition-colors"
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
