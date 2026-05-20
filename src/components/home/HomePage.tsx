import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import {
  SectionContainer,
  ContentWrapper,
  FeatureCard,
  GlassCard,
  PrimaryButton,
  SecondaryButton,
  StatCard,
  CTASection,
} from '@/components/ui';
import { ROUTE_PATHS } from '@/config/routes';
import { ANIMATION } from '@/constants/theme';
import {
  Activity,
  Brain,
  Microscope,
  Sparkles,
  TrendingUp,
  Users,
  Heart,
  Shield,
  Zap,
  BarChart3,
  Stethoscope,
  FlaskConical,
} from 'lucide-react';

const stats = [
  { value: '15+', label: 'Years of Research', suffix: '' },
  { value: '50', label: 'Clinical Trials', suffix: 'K+' },
  { value: '98', label: 'Patient Satisfaction', suffix: '%' },
  { value: '200', label: 'Partner Hospitals', suffix: '+' },
];

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'Advanced Stem Cell Therapy',
    description: 'Cutting-edge regenerative treatments leveraging autologous and allogeneic stem cell technologies for tissue repair and healing.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: 'AI-Powered Diagnostics',
    description: 'Intelligent assessment tools powered by machine learning to evaluate patient eligibility and predict treatment outcomes.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: 'Personalized Treatment Plans',
    description: 'Tailored regenerative protocols designed for each patient based on comprehensive biomarker analysis and clinical evaluation.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Evidence-Based Research',
    description: 'Over 15 years of peer-reviewed clinical research backing our therapies with published outcomes in leading medical journals.',
  },
];

const trustLogos = [
  'Johns Hopkins',
  'Mayo Clinic',
  'Cleveland Clinic',
  'Mass General',
  'Stanford Health',
];

// Floating particle component
function FloatingParticle({ delay = 0, duration = 20, x = 0, y = 0 }: { delay?: number; duration?: number; x?: number; y?: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
      initial={{ opacity: 0, x, y }}
      animate={{
        opacity: [0, 1, 0],
        y: [y, y - 100],
        x: [x, x + Math.random() * 50 - 25],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

// Interactive Entry Card Component
interface EntryCardProps {
  type: 'doctor' | 'patient';
  title: string;
  subtitle: string;
  features: string[];
  icon: React.ReactNode;
  gradient: string;
  link: string;
}

function EntryCard({ type, title, subtitle, features, icon, gradient, link }: EntryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <Link to={link}>
      <motion.div
        className="relative h-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute -inset-1 rounded-3xl opacity-0 blur-xl ${gradient}`}
          animate={{
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Main card */}
        <div className="relative h-full bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
          {/* Animated gradient overlay */}
          <motion.div
            className={`absolute inset-0 opacity-10 ${gradient}`}
            animate={{
              backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            style={{ backgroundSize: '200% 200%' }}
          />

          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `linear-gradient(${isHovered ? '135deg' : '0deg'}, transparent 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)`,
            }}
            animate={{
              rotate: isHovered ? 360 : 0,
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Content */}
          <div className="relative p-8 lg:p-10 h-full flex flex-col" style={{ transform: 'translateZ(50px)' }}>
            {/* Icon */}
            <motion.div
              className={`w-20 h-20 rounded-2xl ${gradient} flex items-center justify-center mb-6 shadow-lg`}
              animate={{
                boxShadow: isHovered
                  ? '0 20px 60px rgba(6, 182, 212, 0.4)'
                  : '0 10px 30px rgba(6, 182, 212, 0.2)',
              }}
            >
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.6 }}
              >
                {icon}
              </motion.div>
            </motion.div>

            {/* Title */}
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-3">
              {title}
            </h2>
            <p className="text-cyan-100 text-lg mb-8">{subtitle}</p>

            {/* Features */}
            <div className="space-y-4 mb-8 flex-1">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="mt-1 w-6 h-6 rounded-lg bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3 h-3 text-cyan-300" />
                  </div>
                  <span className="text-white/90 text-sm leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              className={`w-full py-4 rounded-xl ${gradient} flex items-center justify-center gap-2 font-semibold text-white shadow-lg`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Enter {type === 'doctor' ? 'Clinical' : 'Patient'} Portal</span>
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="w-5 h-5" />
              </motion.div>
            </motion.div>

            {/* Floating particles inside card */}
            {isHovered && (
              <>
                {[...Array(8)].map((_, i) => (
                  <FloatingParticle
                    key={i}
                    delay={i * 0.2}
                    duration={3}
                    x={Math.random() * 300}
                    y={400}
                  />
                ))}
              </>
            )}
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-400/20 to-transparent rounded-tr-full" />
        </div>
      </motion.div>
    </Link>
  );
}

function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-950 to-teal-900">
      {/* Animated background gradients */}
      <motion.div
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-3xl"
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
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-3xl"
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

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <FloatingParticle
          key={i}
          delay={i * 0.5}
          duration={15 + Math.random() * 10}
          x={Math.random() * window.innerWidth}
          y={window.innerHeight}
        />
      ))}

      <ContentWrapper className="relative py-20 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-xl mb-8"
            animate={{
              boxShadow: [
                '0 0 20px rgba(6, 182, 212, 0.3)',
                '0 0 40px rgba(6, 182, 212, 0.5)',
                '0 0 20px rgba(6, 182, 212, 0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </motion.div>
            <span className="text-sm font-semibold text-cyan-300 tracking-wide">
              AI-POWERED REGENERATIVE MEDICINE ECOSYSTEM
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Enter the Future of
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Healthcare
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-cyan-100/80 max-w-3xl mx-auto leading-relaxed">
            Advanced stem cell therapy powered by artificial intelligence
          </p>
        </motion.div>

        {/* Entry Cards - Desktop Split Screen */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <EntryCard
              type="doctor"
              title="FOR DOCTORS"
              subtitle="Clinical Intelligence Platform"
              features={[
                'Real-time clinical evidence & trial analytics',
                'AI-powered diagnostic assistance',
                'Advanced patient outcome predictions',
                'Comprehensive research dashboards',
                'Collaborative treatment protocols',
              ]}
              icon={<Stethoscope className="w-10 h-10 text-white" />}
              gradient="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600"
              link={ROUTE_PATHS.DOCTORS}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <EntryCard
              type="patient"
              title="FOR PATIENTS"
              subtitle="Personalized Care Journey"
              features={[
                'AI-guided self-assessment tools',
                'Personalized treatment roadmaps',
                '24/7 intelligent health assistant',
                'Real-time recovery tracking',
                'Regenerative therapy education',
              ]}
              icon={<Heart className="w-10 h-10 text-white" />}
              gradient="bg-gradient-to-br from-teal-500 via-emerald-600 to-cyan-600"
              link={ROUTE_PATHS.PATIENTS}
            />
          </motion.div>
        </div>

        {/* Entry Cards - Mobile Stacked */}
        <div className="lg:hidden space-y-6 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <EntryCard
              type="doctor"
              title="FOR DOCTORS"
              subtitle="Clinical Intelligence Platform"
              features={[
                'Real-time clinical evidence & trial analytics',
                'AI-powered diagnostic assistance',
                'Advanced patient outcome predictions',
              ]}
              icon={<Stethoscope className="w-10 h-10 text-white" />}
              gradient="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600"
              link={ROUTE_PATHS.DOCTORS}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <EntryCard
              type="patient"
              title="FOR PATIENTS"
              subtitle="Personalized Care Journey"
              features={[
                'AI-guided self-assessment tools',
                'Personalized treatment roadmaps',
                '24/7 intelligent health assistant',
              ]}
              icon={<Heart className="w-10 h-10 text-white" />}
              gradient="bg-gradient-to-br from-teal-500 via-emerald-600 to-cyan-600"
              link={ROUTE_PATHS.PATIENTS}
            />
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {[
            { icon: <Users className="w-6 h-6" />, value: '50K+', label: 'Patients Treated' },
            { icon: <FlaskConical className="w-6 h-6" />, value: '15+', label: 'Years Research' },
            { icon: <TrendingUp className="w-6 h-6" />, value: '98%', label: 'Success Rate' },
            { icon: <Shield className="w-6 h-6" />, value: '100%', label: 'FDA Compliant' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 text-cyan-400 mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-cyan-200/70">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ContentWrapper>
    </div>
  );
}

function StatsSection() {
  return (
    <SectionContainer className="bg-gradient-to-b from-slate-900 to-slate-800 border-y border-cyan-500/20">
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-cyan-200/70">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ContentWrapper>
    </SectionContainer>
  );
}

function FeaturesSection() {
  return (
    <SectionContainer className="bg-slate-800">
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-xl mb-6"
            animate={{
              boxShadow: [
                '0 0 20px rgba(6, 182, 212, 0.2)',
                '0 0 30px rgba(6, 182, 212, 0.4)',
                '0 0 20px rgba(6, 182, 212, 0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300">AI-ENHANCED CAPABILITIES</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Advanced Regenerative Solutions
          </h2>
          <p className="text-xl text-cyan-100/70 max-w-3xl mx-auto">
            Combining cutting-edge science with AI-powered personalization
          </p>
        </motion.div>

        <motion.div
          variants={ANIMATION.stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative group"
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-cyan-100/60 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ContentWrapper>
    </SectionContainer>
  );
}

function ImageSplitSection() {
  return (
    <SectionContainer className="bg-gradient-to-b from-slate-800 to-slate-900">
      <ContentWrapper>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/20">
              <img
                src="/images/doctor-patient.jpg"
                alt="Doctor consulting with patient"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 via-transparent to-transparent" />
            </div>
            <motion.div
              className="absolute -bottom-6 -right-6 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl p-6 shadow-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-4xl font-bold text-white">15+</p>
              <p className="text-sm text-cyan-100 mt-1">Years of Excellence</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 mb-6">
              <Microscope className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">OUR APPROACH</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Redefining Healthcare Through Regeneration
            </h2>
            <p className="text-lg text-cyan-100/70 leading-relaxed mb-8">
              At CiploStem, we harness the body's natural healing capabilities through advanced stem cell therapies. Our multidisciplinary team of researchers and clinicians work together to develop personalized treatment protocols.
            </p>
            <div className="space-y-4 mb-10">
              {[
                'Autologous stem cell harvesting and therapy',
                'Allogeneic mesenchymal stem cell treatments',
                'Comprehensive patient eligibility assessment',
                'Post-treatment monitoring and support',
              ].map((item) => (
                <motion.div
                  key={item}
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                >
                  <div className="mt-1 w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span className="text-cyan-100/80">{item}</span>
                </motion.div>
              ))}
            </div>
            <Link to={ROUTE_PATHS.ABOUT}>
              <motion.button
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold shadow-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn About Our Research
                <Zap className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </ContentWrapper>
    </SectionContainer>
  );
}

function AIAssistantPreview() {
  return (
    <SectionContainer className="bg-slate-900">
      <ContentWrapper>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 mb-6">
              <Brain className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">AI-POWERED</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Your Intelligent Healthcare Companion
            </h2>
            <p className="text-lg text-cyan-100/70 leading-relaxed mb-8">
              Our AI assistant provides personalized guidance on stem cell therapy options, answers your medical questions, and helps navigate your treatment journey with evidence-based information.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { title: 'Instant Answers', desc: 'Get responses in seconds', icon: <Zap className="w-4 h-4" /> },
                { title: 'Personalized', desc: 'Tailored recommendations', icon: <Heart className="w-4 h-4" /> },
                { title: 'Evidence-Based', desc: 'Clinical research backed', icon: <FlaskConical className="w-4 h-4" /> },
                { title: '24/7 Available', desc: 'Always here to help', icon: <Shield className="w-4 h-4" /> },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
                    <div className="text-cyan-400 mb-2">{item.icon}</div>
                    <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-cyan-100/60">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <Link to={ROUTE_PATHS.AI_ASSISTANT}>
              <motion.button
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold shadow-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Chat with AI Assistant
                <Sparkles className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-3xl p-6 lg:p-8 border border-cyan-500/20">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-cyan-500/20">
                <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold text-white">CiploStem AI</p>
                      <p className="text-xs text-cyan-100">Healthcare Assistant</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-green-300"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-xs text-cyan-100">Online</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4 bg-slate-900/50">
                  <motion.div
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl rounded-tl-md px-4 py-3 border border-white/10">
                      <p className="text-sm text-cyan-100">Hello! I'm your CiploStem AI assistant. How can I help you with stem cell therapy today?</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex gap-3 justify-end"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl rounded-tr-md px-4 py-3">
                      <p className="text-sm text-white">What conditions can stem cell therapy treat?</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl rounded-tl-md px-4 py-3 border border-white/10">
                      <p className="text-sm text-cyan-100">Stem cell therapy can help treat orthopedic conditions, autoimmune disorders, neurological conditions, and cardiovascular diseases.</p>
                    </div>
                  </motion.div>
                </div>
                <div className="px-6 pb-6 bg-slate-900/50">
                  <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xl">
                    <input
                      type="text"
                      placeholder="Ask about stem cell therapy..."
                      className="flex-1 bg-transparent text-sm outline-none placeholder-cyan-300/40 text-cyan-100"
                      readOnly
                    />
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </ContentWrapper>
    </SectionContainer>
  );
}

function TrustSection() {
  return (
    <SectionContainer className="bg-slate-800 border-y border-cyan-500/20">
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium text-cyan-300/60 mb-8">
            Trusted by leading healthcare institutions worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {trustLogos.map((name) => (
              <motion.div
                key={name}
                className="px-8 py-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg"
                whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 0.3)' }}
              >
                <span className="text-lg font-bold text-cyan-400/40 tracking-wide">{name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </ContentWrapper>
    </SectionContainer>
  );
}

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ImageSplitSection />
      <AIAssistantPreview />
      <TrustSection />
      <CTASection
        title="Ready to Explore Stem Cell Therapy?"
        description="Take the first step towards regenerative healing. Our team of specialists is here to guide you through every stage of your treatment journey."
        primaryCTA="Start Assessment"
        secondaryCTA="Contact a Specialist"
        onPrimaryClick={() => window.location.href = ROUTE_PATHS.ASSESSMENT}
        onSecondaryClick={() => window.location.href = ROUTE_PATHS.CONTACT}
      />
    </main>
  );
}
