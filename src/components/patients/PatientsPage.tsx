import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  SectionContainer,
  ContentWrapper,
  PageHero,
  SectionHeading,
  FeatureCard,
  InfoCard,
  PrimaryButton,
  SecondaryButton,
  GlassCard,
  CTASection,
} from '@/components/ui';
import { ROUTE_PATHS } from '@/config/routes';

const journeySteps = [
  { step: '01', title: 'Initial Consultation', description: 'Meet with our specialists to discuss your medical history, current condition, and treatment goals.' },
  { step: '02', title: 'AI Assessment', description: 'Complete our intelligent assessment to evaluate your eligibility and optimal treatment pathway.' },
  { step: '03', title: 'Personalized Plan', description: 'Receive a tailored treatment protocol designed specifically for your condition and health profile.' },
  { step: '04', title: 'Treatment', description: 'Undergo your stem cell therapy procedure at one of our certified partner facilities.' },
  { step: '05', title: 'Recovery & Monitoring', description: 'Receive comprehensive post-treatment care with regular follow-ups and progress tracking.' },
];

const treatments = [
  { title: 'Orthopedic Regeneration', description: 'Stem cell therapy for joint repair, cartilage regeneration, and musculoskeletal healing.', icon: '🦴' },
  { title: 'Cardiac Repair', description: 'Advanced cellular therapies for heart tissue regeneration following cardiac events.', icon: '❤️' },
  { title: 'Neurological Recovery', description: 'Innovative treatments for neurodegenerative conditions and spinal cord injuries.', icon: '🧠' },
  { title: 'Autoimmune Modulation', description: 'Immune system regulation through targeted stem cell interventions.', icon: '🛡️' },
  { title: 'Wound Healing', description: 'Accelerated tissue repair and chronic wound management solutions.', icon: '🩹' },
  { title: 'Anti-Aging & Wellness', description: 'Regenerative wellness protocols for cellular rejuvenation and vitality.', icon: '✨' },
];

const faqs = [
  { q: 'Is stem cell therapy safe?', a: 'Yes. Our therapies undergo rigorous clinical trials and FDA review. We use both autologous (your own) and carefully screened allogeneic stem cells with established safety profiles.' },
  { q: 'How long does treatment take?', a: 'Treatment duration varies by condition. Most procedures are outpatient and completed within 2-4 hours, with initial results visible within 4-12 weeks.' },
  { q: 'Will my insurance cover this?', a: 'Coverage varies by provider and condition. Our team works with you to navigate insurance options and offers financing plans for qualifying patients.' },
  { q: 'What is the recovery process like?', a: 'Most patients resume normal activities within 1-3 days. We provide comprehensive post-treatment guidance and schedule regular follow-up appointments.' },
];

export function PatientsPage() {
  return (
    <main>
      <PageHero
        title="For Patients"
        subtitle="Your journey to regenerative healing starts here. Explore our advanced stem cell therapies and discover how CiploStem can help transform your health."
      >
        <div className="flex flex-wrap gap-4">
          <Link to={ROUTE_PATHS.ASSESSMENT}>
            <PrimaryButton>Take Self-Assessment</PrimaryButton>
          </Link>
          <Link to={ROUTE_PATHS.CONTACT}>
            <SecondaryButton>Find a Hospital</SecondaryButton>
          </Link>
        </div>
      </PageHero>

      <SectionContainer>
        <ContentWrapper>
          <SectionHeading title="Your Treatment Journey" subtitle="A clear, supportive path from consultation to recovery." />
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {journeySteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer className="bg-neutral-50">
        <ContentWrapper>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                <img src="/images/doctor-patient.jpg" alt="Doctor with patient" className="w-full h-full object-cover" />
              </div>
              <GlassCard className="absolute bottom-6 left-6 right-6 p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">FDA Approved Protocols</p>
                    <p className="text-xs text-neutral-500">Evidence-based treatment pathways</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-4">
                Understanding Treatment
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
                How Stem Cell Therapy Works
              </h2>
              <p className="mt-6 text-neutral-600 leading-relaxed">
                Stem cell therapy harnesses your body's natural regenerative capabilities. These remarkable cells can transform into specialized cell types, promoting tissue repair and reducing inflammation.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Stem cells are harvested or sourced from certified donors',
                  'Cells are processed and concentrated in our GMP facility',
                  'Targeted delivery to the affected area under imaging guidance',
                  'Cells integrate and promote natural tissue regeneration',
                  'Ongoing monitoring ensures optimal recovery',
                ].map((step) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-neutral-700 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer>
        <ContentWrapper>
          <SectionHeading title="Treatment Areas" subtitle="Explore our specialized regenerative therapy programs." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((treatment) => (
              <FeatureCard key={treatment.title}>
                <div className="text-3xl mb-4">{treatment.icon}</div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{treatment.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{treatment.description}</p>
              </FeatureCard>
            ))}
          </div>
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer className="bg-neutral-50">
        <ContentWrapper>
          <SectionHeading title="Patient FAQs" subtitle="Common questions about our stem cell therapies." />
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq) => (
              <InfoCard key={faq.q}>
                <h3 className="font-semibold text-neutral-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{faq.a}</p>
              </InfoCard>
            ))}
          </div>
        </ContentWrapper>
      </SectionContainer>

      <CTASection
        title="Start Your Healing Journey"
        description="Take our quick AI-powered assessment to discover if stem cell therapy is right for you."
        primaryCTA="Take Assessment Now"
        secondaryCTA="Contact Us"
        onPrimaryClick={() => window.location.href = ROUTE_PATHS.ASSESSMENT}
        onSecondaryClick={() => window.location.href = ROUTE_PATHS.CONTACT}
      />
    </main>
  );
}
