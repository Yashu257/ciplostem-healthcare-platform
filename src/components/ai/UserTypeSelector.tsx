import { motion } from 'framer-motion';
import { User, Stethoscope, Users } from 'lucide-react';
import type { UserType } from '@/services/aiApiService';

interface UserTypeSelectorProps {
  selectedType: UserType;
  onTypeChange: (type: UserType) => void;
}

const userTypes = [
  {
    type: 'patient' as UserType,
    label: 'Patient',
    icon: User,
    description: 'Get personalized treatment guidance',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    type: 'doctor' as UserType,
    label: 'Doctor',
    icon: Stethoscope,
    description: 'Access clinical data and research',
    color: 'from-teal-500 to-emerald-500'
  },
  {
    type: 'general' as UserType,
    label: 'General',
    icon: Users,
    description: 'Learn about stem cell therapy',
    color: 'from-primary-500 to-purple-500'
  }
];

export function UserTypeSelector({ selectedType, onTypeChange }: UserTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <div className="w-1 h-4 rounded-full bg-gradient-to-b from-cyan-500 to-teal-500" />
        <h3 className="text-sm font-semibold text-neutral-700">
          I am a...
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {userTypes.map(({ type, label, icon: Icon, description, color }) => {
          const isSelected = selectedType === type;

          return (
            <motion.button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`relative p-3 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-cyan-500 bg-cyan-50/50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  layoutId="userTypeSelector"
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}

              <div className="relative flex flex-col items-center gap-2">
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected
                      ? `bg-gradient-to-br ${color}`
                      : 'bg-neutral-100'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isSelected ? 'text-white' : 'text-neutral-600'
                    }`}
                  />
                </div>

                {/* Label */}
                <div className="text-center">
                  <div
                    className={`text-sm font-semibold ${
                      isSelected ? 'text-cyan-700' : 'text-neutral-700'
                    }`}
                  >
                    {label}
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5 hidden sm:block">
                    {description}
                  </div>
                </div>

                {/* Check mark */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg"
                  >
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
