import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SectionContainer,
  ContentWrapper,
  PageHero,
  PrimaryButton,
  SecondaryButton,
  GlassCard,
} from '@/components/ui';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/config/routes';

interface Question {
  id: number;
  question: string;
  type: 'single' | 'multi' | 'text';
  options?: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What is your primary health concern?',
    type: 'single',
    options: ['Joint / Bone Pain', 'Autoimmune Condition', 'Cardiac Condition', 'Neurological Condition', 'Chronic Wound', 'General Wellness / Anti-aging'],
  },
  {
    id: 2,
    question: 'How long have you been experiencing this condition?',
    type: 'single',
    options: ['Less than 6 months', '6 months to 2 years', '2 to 5 years', 'More than 5 years'],
  },
  {
    id: 3,
    question: 'What treatments have you previously tried?',
    type: 'multi',
    options: ['Physical Therapy', 'Medication', 'Surgery', 'Injections / Steroids', 'Alternative Medicine', 'No prior treatment'],
  },
  {
    id: 4,
    question: 'How would you rate your current pain or discomfort level?',
    type: 'single',
    options: ['1-2: Minimal', '3-4: Mild', '5-6: Moderate', '7-8: Severe', '9-10: Very Severe'],
  },
  {
    id: 5,
    question: 'Do you have any of the following conditions?',
    type: 'multi',
    options: ['Diabetes', 'Heart Disease', 'Cancer (in remission)', 'Blood Disorder', 'Active Infection', 'None of the above'],
  },
  {
    id: 6,
    question: 'What is your age range?',
    type: 'single',
    options: ['18-30', '31-45', '46-55', '56-65', '65+'],
  },
  {
    id: 7,
    question: 'Are you currently taking any medications?',
    type: 'single',
    options: ['No medications', '1-2 medications', '3-5 medications', 'More than 5 medications'],
  },
  {
    id: 8,
    question: 'Please share any additional details about your condition.',
    type: 'text',
  },
];

export function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [textInput, setTextInput] = useState('');

  const progress = ((currentStep + 1) / questions.length) * 100;
  const question = questions[currentStep];

  const handleSingleSelect = (option: string) => {
    setAnswers({ ...answers, [question.id]: option });
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsComplete(true);
      }
    }, 300);
  };

  const handleMultiSelect = (option: string) => {
    const current = (answers[question.id] as string[]) || [];
    const updated = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
    setAnswers({ ...answers, [question.id]: updated });
  };

  const handleNext = () => {
    if (question.type === 'text') {
      setAnswers({ ...answers, [question.id]: textInput });
    }
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isComplete) {
    return (
      <main>
        <PageHero title="Assessment Complete" subtitle="Thank you for completing the health assessment. Our team will review your responses." />
        <SectionContainer>
          <ContentWrapper>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Assessment Submitted Successfully</h2>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Based on your responses, our AI system has generated a preliminary evaluation. A member of our clinical team will review your assessment and contact you within 24-48 hours with personalized recommendations.
              </p>
              <GlassCard className="p-8 text-left mb-8">
                <h3 className="font-semibold text-neutral-900 mb-4">Your Assessment Summary</h3>
                <div className="space-y-3">
                  {questions.map((q, i) => {
                    const answer = answers[q.id];
                    if (!answer) return null;
                    return (
                      <div key={q.id} className="flex items-start gap-3 py-2 border-b border-neutral-100 last:border-0">
                        <span className="text-sm font-medium text-primary-600 flex-shrink-0">Q{i + 1}.</span>
                        <div>
                          <p className="text-sm text-neutral-500">{q.question}</p>
                          <p className="text-sm font-medium text-neutral-800 mt-0.5">
                            {Array.isArray(answer) ? answer.join(', ') : answer || 'Not answered'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={ROUTE_PATHS.CONTACT}>
                  <PrimaryButton>Schedule Consultation</PrimaryButton>
                </Link>
                <Link to={ROUTE_PATHS.HOME}>
                  <SecondaryButton>Return Home</SecondaryButton>
                </Link>
              </div>
            </motion.div>
          </ContentWrapper>
        </SectionContainer>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        title="Health Self-Assessment"
        subtitle="Complete this assessment to receive a preliminary evaluation of your eligibility for stem cell therapy."
      />

      <SectionContainer>
        <ContentWrapper>
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-neutral-600">Question {currentStep + 1} of {questions.length}</span>
                <span className="text-sm font-medium text-primary-600">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-8">
                  <h2 className="text-xl font-bold text-neutral-900 mb-6">{question.question}</h2>

                  {question.type === 'single' && (
                    <div className="space-y-3">
                      {question.options?.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSingleSelect(option)}
                          className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 ${
                            answers[question.id] === option
                              ? 'border-primary-400 bg-primary-50 text-primary-800'
                              : 'border-neutral-100 bg-white text-neutral-700 hover:border-primary-200 hover:bg-primary-50/30'
                          }`}
                        >
                          <span className="font-medium text-sm">{option}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {question.type === 'multi' && (
                    <div className="space-y-3">
                      {question.options?.map((option) => {
                        const selected = ((answers[question.id] as string[]) || []).includes(option);
                        return (
                          <button
                            key={option}
                            onClick={() => handleMultiSelect(option)}
                            className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 ${
                              selected
                                ? 'border-primary-400 bg-primary-50 text-primary-800'
                                : 'border-neutral-100 bg-white text-neutral-700 hover:border-primary-200 hover:bg-primary-50/30'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'bg-primary-500 border-primary-500' : 'border-neutral-300'}`}>
                                {selected && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                              </div>
                              <span className="font-medium text-sm">{option}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {question.type === 'text' && (
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      rows={5}
                      placeholder="Please describe your condition, symptoms, and any relevant medical history..."
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 resize-none"
                    />
                  )}

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
                    <button
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      className="px-5 py-2.5 text-sm font-medium text-neutral-600 rounded-xl hover:bg-neutral-50 disabled:opacity-40 transition-all"
                    >
                      ← Previous
                    </button>
                    {(question.type === 'multi' || question.type === 'text') && (
                      <PrimaryButton onClick={handleNext}>
                        {currentStep === questions.length - 1 ? 'Submit Assessment' : 'Next →'}
                      </PrimaryButton>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span>Your information is encrypted and HIPAA-compliant</span>
            </div>
          </div>
        </ContentWrapper>
      </SectionContainer>
    </main>
  );
}
