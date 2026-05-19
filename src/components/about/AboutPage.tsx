import { motion } from 'framer-motion';
import {
  SectionContainer,
  ContentWrapper,
  PageHero,
  SectionHeading,
  FeatureCard,
  GlassCard,
  PrimaryButton,
  CTASection,
} from '@/components/ui';
import { ROUTE_PATHS } from '@/config/routes';
import { Link } from 'react-router-dom';

const timelineItems = [
  { year: '2009', title: 'Foundation', description: 'CiploStem founded with a vision to advance regenerative medicine research and therapies.' },
  { year: '2013', title: 'First Clinical Trial', description: 'Launched our first Phase I clinical trial for autologous stem cell therapy in orthopedics.' },
  { year: '2016', title: 'AI Integration', description: 'Introduced AI-powered patient assessment and treatment matching technology.' },
  { year: '2019', title: 'Global Expansion', description: 'Expanded operations to 50+ partner hospitals across North America and Europe.' },
  { year: '2022', title: 'FDA Approval', description: 'Received FDA approval for our lead regenerative therapy protocol.' },
  { year: '2024', title: 'Next Generation', description: 'Launched next-generation allogeneic stem cell platform with enhanced efficacy.' },
];

const values = [
  { icon: '🔬', title: 'Scientific Rigor', description: 'Every treatment backed by peer-reviewed research and clinical data.' },
  { icon: '🤝', title: 'Patient First', description: 'Compassionate care at the core of every decision we make.' },
  { icon: '💡', title: 'Innovation', description: 'Continuously pushing boundaries in regenerative medicine.' },
  { icon: '🌍', title: 'Global Impact', description: 'Making advanced therapies accessible to patients worldwide.' },
  { icon: '🏆', title: 'Excellence', description: 'Setting the highest standards in clinical outcomes and safety.' },
  { icon: '🔒', title: 'Integrity', description: 'Transparent, ethical practices in all aspects of our operations.' },
];

const team = [
  { name: 'Dr. Sarah Chen', role: 'Chief Executive Officer', specialty: 'Regenerative Medicine' },
  { name: 'Dr. James Mitchell', role: 'Chief Medical Officer', specialty: 'Orthopedic Surgery' },
  { name: 'Dr. Amara Okafor', role: 'Head of Research', specialty: 'Cell Biology' },
  { name: 'Dr. Michael Torres', role: 'VP Clinical Affairs', specialty: 'Hematology' },
  { name: 'Dr. Lisa Park', role: 'Chief Technology Officer', specialty: 'Biomedical Engineering' },
  { name: 'Dr. Robert Klein', role: 'Director of AI', specialty: 'Computational Biology' },
];

export function AboutPage() {
  return (
    <main>
      <PageHero
        title="About CiploStem"
        subtitle="Pioneering the future of regenerative medicine through innovative stem cell therapies, cutting-edge research, and compassionate patient care."
      >
        <div className="flex gap-4">
          <Link to={ROUTE_PATHS.PATIENTS}>
            <PrimaryButton>Our Treatments</PrimaryButton>
          </Link>
        </div>
      </PageHero>

      <SectionContainer>
        <ContentWrapper>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-4">
                Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
                Transforming Lives Through Regenerative Science
              </h2>
              <p className="mt-6 text-neutral-600 leading-relaxed">
                CiploStem was founded with a singular mission: to harness the extraordinary potential of stem cells to treat previously untreatable conditions and improve quality of life for millions of patients worldwide.
              </p>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                Our interdisciplinary team combines deep expertise in cell biology, clinical medicine, and artificial intelligence to develop next-generation regenerative therapies that are safe, effective, and accessible.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-primary-50">
                  <p className="text-2xl font-bold text-primary-700">200+</p>
                  <p className="text-sm text-neutral-600 mt-1">Research Papers</p>
                </div>
                <div className="p-4 rounded-xl bg-teal-50">
                  <p className="text-2xl font-bold text-teal-700">50+</p>
                  <p className="text-sm text-neutral-600 mt-1">Clinical Trials</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                <img src="/images/lab-research.jpg" alt="Research laboratory" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer className="bg-neutral-50">
        <ContentWrapper>
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide everything we do at CiploStem."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <FeatureCard key={value.title}>
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{value.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{value.description}</p>
              </FeatureCard>
            ))}
          </div>
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer>
        <ContentWrapper>
          <SectionHeading
            title="Innovation Timeline"
            subtitle="Key milestones in our journey to transform regenerative medicine."
          />
          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-primary-200 transform lg:-translate-x-px" />
            <div className="space-y-12">
              {timelineItems.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex items-center gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} pl-12 lg:pl-0`}>
                    <GlassCard className="p-6">
                      <span className="text-sm font-bold text-primary-600">{item.year}</span>
                      <h3 className="text-lg font-semibold text-neutral-900 mt-1">{item.title}</h3>
                      <p className="text-sm text-neutral-600 mt-2">{item.description}</p>
                    </GlassCard>
                  </div>
                  <div className="absolute left-4 lg:left-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-white shadow transform -translate-x-1/2" />
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer className="bg-neutral-50">
        <ContentWrapper>
          <SectionHeading
            title="Leadership Team"
            subtitle="World-class experts driving innovation in regenerative medicine."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <motion.div
                key={member.name}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-neutral-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-teal-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary-700">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">{member.name}</h3>
                <p className="text-sm text-primary-600 font-medium mt-1">{member.role}</p>
                <p className="text-xs text-neutral-500 mt-1">{member.specialty}</p>
              </motion.div>
            ))}
          </div>
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer>
        <ContentWrapper>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                <img src="/images/medical-team.jpg" alt="Medical team" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-4">
                Our Vision
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
                A World Where Regeneration Is the Standard of Care
              </h2>
              <p className="mt-6 text-neutral-600 leading-relaxed">
                We envision a future where stem cell therapy is a frontline treatment option, where healing comes from within, and where every patient has access to the transformative power of regenerative medicine.
              </p>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                Through continuous research, clinical innovation, and strategic partnerships, we are building that future — one breakthrough at a time.
              </p>
            </motion.div>
          </div>
        </ContentWrapper>
      </SectionContainer>

      <CTASection
        title="Join Our Mission"
        description="Whether you're a patient, physician, or researcher, there's a place for you in the CiploStem ecosystem."
        primaryCTA="For Patients"
        secondaryCTA="For Doctors"
        onPrimaryClick={() => window.location.href = ROUTE_PATHS.PATIENTS}
        onSecondaryClick={() => window.location.href = ROUTE_PATHS.DOCTORS}
      />
    </main>
  );
}
