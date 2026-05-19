import { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { ANIMATION } from '@/constants/theme';

interface ButtonBaseProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
}

export function PrimaryButton({ children, onClick, className, disabled, type = 'button', size = 'md' }: ButtonBaseProps) {
  const sizeClasses = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' };
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-xl text-white',
        'bg-gradient-to-r from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/20',
        'hover:from-cyan-600 hover:to-teal-600 transition-all duration-300',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </motion.button>
  );
}

export function SecondaryButton({ children, onClick, className, disabled, type = 'button', size = 'md' }: ButtonBaseProps) {
  const sizeClasses = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' };
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-xl',
        'bg-primary-50 text-primary-700 border border-primary-200',
        'hover:bg-primary-100 transition-all duration-300',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </motion.button>
  );
}

export function OutlineButton({ children, onClick, className, disabled, type = 'button', size = 'md' }: ButtonBaseProps) {
  const sizeClasses = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' };
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-xl',
        'border-2 border-neutral-200 text-neutral-700 bg-white',
        'hover:border-primary-300 hover:text-primary-700 transition-all duration-300',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </motion.button>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: CardProps) {
  return (
    <motion.div
      {...(hover ? ANIMATION.scaleOnHover : {})}
      className={cn(
        'bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60',
        'shadow-lg shadow-cyan-500/5',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function FeatureCard({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      variants={ANIMATION.fadeInUp}
      {...(hover ? ANIMATION.scaleOnHover : {})}
      className={cn(
        'bg-white rounded-2xl border border-neutral-100 p-6 lg:p-8',
        'shadow-md hover:shadow-xl transition-shadow duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function InfoCard({ children, className }: CardProps) {
  return (
    <div className={cn(
      'bg-gradient-to-br from-primary-50 to-teal-50 rounded-2xl p-6 lg:p-8',
      'border border-primary-100/50',
      className
    )}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionContainer({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-20 lg:py-28', className)}>
      {children}
    </section>
  );
}

export function ContentWrapper({ children, className }: SectionProps) {
  return (
    <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}

interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  children?: ReactNode;
}

export function PageHero({ title, subtitle, backgroundImage, children }: PageHeroProps) {
  return (
    <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-teal-50/30 to-white" />
      {backgroundImage && (
        <div className="absolute inset-0 opacity-10">
          <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl" />
      <ContentWrapper className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900">
            {title}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </ContentWrapper>
    </div>
  );
}

interface HeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, centered = true, className }: HeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className={cn(centered && 'text-center', 'mb-12 lg:mb-16', className)}
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  name?: string;
}

export function InputField({ label, type = 'text', placeholder, value, onChange, required, className, name }: InputFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all duration-200"
      />
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  required?: boolean;
  className?: string;
  name?: string;
}

export function TextAreaField({ label, placeholder, value, onChange, rows = 4, required, className, name }: TextAreaFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all duration-200 resize-none"
      />
    </div>
  );
}

interface TabsProps {
  tabs: string[];
  activeTab: number;
  onChange: (index: number) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tabs.map((tab, index) => (
        <button
          key={tab}
          onClick={() => onChange(index)}
          className={cn(
            'px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
            activeTab === index
              ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

interface CTASectionProps {
  title: string;
  description: string;
  primaryCTA: string;
  secondaryCTA?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function CTASection({ title, description, primaryCTA, secondaryCTA, onPrimaryClick, onSecondaryClick }: CTASectionProps) {
  return (
    <SectionContainer className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-teal-700" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-300 rounded-full blur-3xl" />
      </div>
      <ContentWrapper className="relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">{title}</h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-10">{description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton onClick={onPrimaryClick} className="bg-white text-primary-700 hover:bg-primary-50 shadow-xl">
              {primaryCTA}
            </PrimaryButton>
            {secondaryCTA && (
              <button
                onClick={onSecondaryClick}
                className="px-6 py-3 text-sm font-semibold rounded-xl text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
              >
                {secondaryCTA}
              </button>
            )}
          </div>
        </motion.div>
      </ContentWrapper>
    </SectionContainer>
  );
}

interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

export function ChatBubble({ message, sender, timestamp }: ChatBubbleProps) {
  const isUser = sender === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex gap-3 max-w-[85%]', isUser ? 'ml-auto' : 'mr-auto')}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
      )}
      <div className={cn(
        'rounded-2xl px-4 py-3',
        isUser ? 'bg-primary-500 text-white rounded-br-md' : 'bg-neutral-100 text-neutral-800 rounded-bl-md'
      )}>
        <p className="text-sm leading-relaxed">{message}</p>
        <span className={cn('text-xs mt-1 block', isUser ? 'text-primary-100' : 'text-neutral-400')}>
          {timestamp}
        </span>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center">
          <span className="text-white text-xs font-bold">U</span>
        </div>
      )}
    </motion.div>
  );
}

interface AIMessageCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function AIMessageCard({ icon, title, description }: AIMessageCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-neutral-800 text-sm">{title}</h4>
        <p className="text-xs text-neutral-500 mt-1">{description}</p>
      </div>
    </motion.div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
              <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function StatCard({ value, label, suffix }: { value: string; label: string; suffix?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center p-6"
    >
      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
        {value}{suffix}
      </div>
      <p className="mt-2 text-sm text-neutral-500">{label}</p>
    </motion.div>
  );
}

export { motion };
