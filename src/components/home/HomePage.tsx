import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-teal-50/30 to-white" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-200/15 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-200/15 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />

      <ContentWrapper className="relative py-32 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-sm font-medium text-primary-700">Pioneering Regenerative Medicine</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              The Future of{' '}
              <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Stem Cell
              </span>{' '}
              Therapy
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-xl">
              Transforming healthcare through advanced regenerative medicine. Our evidence-based stem cell therapies offer new hope for patients with complex conditions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to={ROUTE_PATHS.ASSESSMENT}>
                <PrimaryButton size="lg">
                  Start Your Assessment
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </PrimaryButton>
              </Link>
              <Link to={ROUTE_PATHS.PATIENTS}>
                <SecondaryButton size="lg">
                  Learn More
                </SecondaryButton>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary-300 to-teal-300 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-neutral-500 mt-1">Trusted by 50,000+ patients</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/hero-stem-cell.jpg"
                alt="Advanced stem cell research laboratory"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-transparent" />
            </div>

            <GlassCard className="absolute -bottom-6 -left-6 p-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">FDA Approved</p>
                  <p className="text-xs text-neutral-500">Clinical Stage Therapy</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="absolute -top-4 -right-4 p-4 shadow-xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-neutral-800">98% Success Rate</span>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </ContentWrapper>
    </div>
  );
}

function StatsSection() {
  return (
    <SectionContainer className="bg-white border-y border-neutral-100">
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </motion.div>
      </ContentWrapper>
    </SectionContainer>
  );
}

function FeaturesSection() {
  return (
    <SectionContainer>
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-4">
            Why CiploStem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900">
            Advanced Regenerative Solutions
          </h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Combining cutting-edge science with personalized care to deliver transformative outcomes.
          </p>
        </motion.div>

        <motion.div
          variants={ANIMATION.stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-teal-50 flex items-center justify-center text-primary-600 mb-5">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">{feature.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{feature.description}</p>
            </FeatureCard>
          ))}
        </motion.div>
      </ContentWrapper>
    </SectionContainer>
  );
}

function ImageSplitSection() {
  return (
    <SectionContainer className="bg-neutral-50">
      <ContentWrapper>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <img
                src="/images/doctor-patient.jpg"
                alt="Doctor consulting with patient"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-neutral-100">
              <p className="text-3xl font-bold text-primary-600">15+</p>
              <p className="text-sm text-neutral-500 mt-1">Years of Excellence</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-4">
              About Our Approach
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
              Redefining Healthcare Through Regeneration
            </h2>
            <p className="mt-6 text-neutral-600 leading-relaxed">
              At CiploStem, we harness the body's natural healing capabilities through advanced stem cell therapies. Our multidisciplinary team of researchers and clinicians work together to develop personalized treatment protocols.
            </p>
            <div className="mt-8 space-y-4">
              {[
                'Autologous stem cell harvesting and therapy',
                'Allogeneic mesenchymal stem cell treatments',
                'Comprehensive patient eligibility assessment',
                'Post-treatment monitoring and support',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link to={ROUTE_PATHS.ABOUT}>
                <PrimaryButton>
                  Learn About Our Research
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </PrimaryButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </ContentWrapper>
    </SectionContainer>
  );
}

function AIAssistantPreview() {
  return (
    <SectionContainer>
      <ContentWrapper>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-4">
              AI-Powered
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
              Your Intelligent Healthcare Companion
            </h2>
            <p className="mt-6 text-neutral-600 leading-relaxed">
              Our AI assistant provides personalized guidance on stem cell therapy options, answers your medical questions, and helps navigate your treatment journey with evidence-based information.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { title: 'Instant Answers', desc: 'Get responses to your healthcare questions in seconds' },
                { title: 'Personalized', desc: 'Tailored recommendations based on your profile' },
                { title: 'Evidence-Based', desc: 'All information backed by clinical research' },
                { title: '24/7 Available', desc: 'Access support whenever you need it' },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                  <h4 className="font-semibold text-neutral-800 text-sm">{item.title}</h4>
                  <p className="text-xs text-neutral-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link to={ROUTE_PATHS.AI_ASSISTANT}>
                <PrimaryButton>
                  Chat with AI Assistant
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </PrimaryButton>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative bg-gradient-to-br from-primary-50 to-teal-50 rounded-3xl p-6 lg:p-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-primary-500 to-teal-500 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">CiploStem AI</p>
                      <p className="text-xs text-primary-100">Healthcare Assistant</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-300" />
                      <span className="text-xs text-primary-100">Online</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-700 text-xs font-bold">AI</span>
                    </div>
                    <div className="bg-neutral-50 rounded-2xl rounded-tl-md px-4 py-3">
                      <p className="text-sm text-neutral-700">Hello! I'm your CiploStem AI assistant. How can I help you with stem cell therapy today?</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-primary-500 rounded-2xl rounded-tr-md px-4 py-3">
                      <p className="text-sm text-white">What conditions can stem cell therapy treat?</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-700 text-xs font-bold">AI</span>
                    </div>
                    <div className="bg-neutral-50 rounded-2xl rounded-tl-md px-4 py-3">
                      <p className="text-sm text-neutral-700">Stem cell therapy can help treat orthopedic conditions, autoimmune disorders, neurological conditions, and cardiovascular diseases. Would you like to know more about any specific area?</p>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <input
                      type="text"
                      placeholder="Ask about stem cell therapy..."
                      className="flex-1 bg-transparent text-sm outline-none placeholder-neutral-400"
                      readOnly
                    />
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
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
    <SectionContainer className="bg-neutral-50">
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium text-neutral-500 mb-8">
            Trusted by leading healthcare institutions worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {trustLogos.map((name) => (
              <div
                key={name}
                className="px-6 py-3 bg-white rounded-xl border border-neutral-100 shadow-sm"
              >
                <span className="text-lg font-bold text-neutral-300 tracking-wide">{name}</span>
              </div>
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
