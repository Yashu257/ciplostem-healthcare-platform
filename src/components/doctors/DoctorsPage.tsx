import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SectionContainer,
  ContentWrapper,
  PageHero,
  SectionHeading,
  FeatureCard,
  InfoCard,
  PrimaryButton,
  InputField,
  TextAreaField,
  GlassCard,
} from '@/components/ui';

const researchAreas = [
  { title: 'MSC-Based Immunomodulation', description: 'Investigating mesenchymal stem cell mechanisms for immune system regulation in autoimmune disorders.', tag: 'Active Trial' },
  { title: 'Exosome Therapeutics', description: 'Developing cell-free regenerative therapies using engineered extracellular vesicles for targeted tissue repair.', tag: 'Phase II' },
  { title: 'iPSC-Derived Cardiac Cells', description: 'Advancing induced pluripotent stem cell technology for cardiac tissue regeneration post-myocardial infarction.', tag: 'Pre-Clinical' },
  { title: 'Neural Stem Cell Engineering', description: 'Engineering neural progenitor cells for the treatment of spinal cord injuries and neurodegenerative diseases.', tag: 'Phase I' },
  { title: 'Combination Biologics', description: 'Exploring synergistic effects of stem cells with growth factors and biomaterial scaffolds.', tag: 'Active Trial' },
  { title: 'AI-Guided Cell Manufacturing', description: 'Implementing machine learning for quality control and optimization in GMP cell manufacturing processes.', tag: 'Research' },
];

const publications = [
  { title: 'Long-term Outcomes of Autologous MSC Therapy in Knee Osteoarthritis', journal: 'Nature Regenerative Medicine', year: '2024', authors: 'Chen S., Mitchell J., et al.' },
  { title: 'AI-Driven Patient Stratification for Stem Cell Clinical Trials', journal: 'The Lancet Digital Health', year: '2024', authors: 'Park L., Klein R., et al.' },
  { title: 'Exosome-Mediated Cardiac Repair: A Systematic Review', journal: 'Cell Stem Cell', year: '2023', authors: 'Okafor A., Torres M., et al.' },
  { title: 'Safety Profile of Allogeneic MSC Infusion in Autoimmune Disease', journal: 'JAMA Network Open', year: '2023', authors: 'Mitchell J., Chen S., et al.' },
];

const mechanisms = [
  { title: 'Paracrine Signaling', description: 'MSCs secrete bioactive molecules that modulate local cellular environments and promote tissue repair.' },
  { title: 'Immunomodulation', description: 'Stem cells regulate immune responses through direct cell-cell contact and soluble factor release.' },
  { title: 'Angiogenesis', description: 'Promotion of new blood vessel formation to improve tissue perfusion and support regeneration.' },
  { title: 'Anti-Fibrotic Effects', description: 'Reduction of fibrotic tissue formation through modulation of fibroblast activity and collagen deposition.' },
];

export function DoctorsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', specialty: '', institution: '', message: '' });

  return (
    <main>
      <PageHero
        title="For Healthcare Professionals"
        subtitle="Access clinical research, training opportunities, and partnership programs. Join our network of leading physicians advancing regenerative medicine."
      />

      <SectionContainer>
        <ContentWrapper>
          <SectionHeading title="Clinical Research" subtitle="Active research programs driving the next generation of regenerative therapies." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchAreas.map((area) => (
              <FeatureCard key={area.title}>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">{area.tag}</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{area.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{area.description}</p>
              </FeatureCard>
            ))}
          </div>
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer className="bg-neutral-50">
        <ContentWrapper>
          <SectionHeading title="Mechanism of Action" subtitle="Understanding the therapeutic mechanisms underlying stem cell treatments." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mechanisms.map((m) => (
              <InfoCard key={m.title}>
                <h3 className="font-semibold text-neutral-900 mb-2">{m.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{m.description}</p>
              </InfoCard>
            ))}
          </div>
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer>
        <ContentWrapper>
          <SectionHeading title="Key Publications" subtitle="Selected peer-reviewed publications from our research team." />
          <div className="space-y-4 max-w-4xl mx-auto">
            {publications.map((pub) => (
              <motion.div
                key={pub.title}
                whileHover={{ x: 4 }}
                className="bg-white rounded-xl p-6 border border-neutral-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900">{pub.title}</h3>
                    <p className="text-sm text-neutral-500 mt-1">{pub.authors}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-medium text-primary-600">{pub.journal}</p>
                    <p className="text-xs text-neutral-400 mt-1">{pub.year}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer className="bg-neutral-50">
        <ContentWrapper>
          <SectionHeading title="Training & Events" subtitle="Professional development opportunities in regenerative medicine." />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Stem Cell Therapy Masterclass', date: 'March 15, 2025', type: 'Virtual Workshop', desc: 'Comprehensive training on clinical applications of MSC therapy.' },
              { title: 'Regenerative Medicine Summit', date: 'April 22-24, 2025', type: 'Conference', desc: 'Annual summit featuring latest research and clinical breakthroughs.' },
              { title: 'Clinical Protocol Certification', date: 'Rolling Enrollment', type: 'Online Course', desc: 'Certified training program for CiploStem treatment protocols.' },
            ].map((event) => (
              <GlassCard key={event.title} hover className="p-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 mb-4">
                  {event.type}
                </span>
                <h3 className="font-semibold text-neutral-900 mb-2">{event.title}</h3>
                <p className="text-sm text-neutral-500 mb-3">{event.date}</p>
                <p className="text-sm text-neutral-600">{event.desc}</p>
              </GlassCard>
            ))}
          </div>
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer>
        <ContentWrapper>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <SectionHeading title="Request a Professional Briefing" subtitle="Schedule a detailed clinical briefing with our medical affairs team." centered={false} />
              <p className="text-neutral-600 leading-relaxed -mt-8 mb-8">
                Our medical affairs team provides comprehensive briefings on treatment protocols, clinical data, and partnership opportunities for healthcare professionals.
              </p>
              <div className="space-y-4">
                {[
                  'Detailed clinical data and outcomes review',
                  'Treatment protocol deep-dive',
                  'Patient selection criteria and tools',
                  'Partnership and referral programs',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-neutral-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <div className="space-y-5">
                <InputField label="Full Name" placeholder="Dr. Jane Smith" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <InputField label="Email" type="email" placeholder="jane@hospital.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <InputField label="Specialty" placeholder="Orthopedic Surgery" value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} />
                <InputField label="Institution" placeholder="Hospital / Clinic Name" value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} />
                <TextAreaField label="Message" placeholder="Tell us about your interest in regenerative medicine..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                <PrimaryButton className="w-full">Request Briefing</PrimaryButton>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </SectionContainer>
    </main>
  );
}
