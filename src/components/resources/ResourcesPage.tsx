import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SectionContainer,
  ContentWrapper,
  PageHero,
  SectionHeading,
  FeatureCard,
  Tabs,
  GlassCard,
} from '@/components/ui';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'article' | 'publication' | 'faq' | 'guide';
  date: string;
}

const allResources: Resource[] = [
  { id: '1', title: 'Understanding Stem Cell Therapy: A Complete Guide', description: 'Comprehensive overview of stem cell types, treatment mechanisms, and clinical applications.', category: 'Education', type: 'guide', date: '2024-12-15' },
  { id: '2', title: 'Patient Eligibility Criteria for MSC Therapy', description: 'Detailed guidelines on patient selection criteria and contraindications for mesenchymal stem cell therapy.', category: 'Clinical', type: 'article', date: '2024-11-28' },
  { id: '3', title: 'Long-term Safety Data: 5-Year Follow-up Study', description: 'Published results from our 5-year longitudinal safety study across 12,000 patients.', category: 'Research', type: 'publication', date: '2024-10-15' },
  { id: '4', title: 'What to Expect During Your First Visit', description: 'A step-by-step walkthrough of your initial consultation and assessment process.', category: 'Patient', type: 'guide', date: '2024-09-20' },
  { id: '5', title: 'Regenerative Medicine vs. Traditional Surgery', description: 'Evidence-based comparison of outcomes between regenerative approaches and surgical interventions.', category: 'Education', type: 'article', date: '2024-08-12' },
  { id: '6', title: 'Insurance and Financing Options', description: 'Complete guide to navigating insurance coverage and financing for stem cell therapy.', category: 'Patient', type: 'guide', date: '2024-07-30' },
  { id: '7', title: 'Stem Cell Therapy for Knee Osteoarthritis: Clinical Results', description: 'Phase III trial results demonstrating significant improvement in pain and mobility scores.', category: 'Research', type: 'publication', date: '2024-06-18' },
  { id: '8', title: 'How Does Stem Cell Harvesting Work?', description: 'Explaining the cell collection, processing, and quality control steps in our GMP facility.', category: 'Education', type: 'article', date: '2024-05-25' },
  { id: '9', title: 'Frequently Asked Questions About Treatment', description: 'Answers to the most common questions about stem cell therapy safety, efficacy, and recovery.', category: 'Patient', type: 'faq', date: '2024-04-10' },
  { id: '10', title: 'AI in Regenerative Medicine: Current Applications', description: 'Review of artificial intelligence applications in patient assessment and treatment optimization.', category: 'Research', type: 'publication', date: '2024-03-05' },
];

const faqs = [
  { q: 'What types of stem cells does CiploStem use?', a: 'We primarily use mesenchymal stem cells (MSCs) derived from bone marrow, adipose tissue, and umbilical cord. All cells are processed in our GMP-certified facility.' },
  { q: 'How are stem cells administered?', a: 'Delivery methods depend on the condition being treated and include direct injection, intravenous infusion, and image-guided targeted delivery.' },
  { q: 'What conditions can be treated?', a: 'We treat orthopedic injuries, autoimmune conditions, cardiac conditions, neurological disorders, and chronic wounds, among others.' },
  { q: 'Is stem cell therapy covered by insurance?', a: 'Coverage varies by provider. Some procedures are covered while others may require out-of-pocket payment. We offer financing options.' },
  { q: 'What are the potential risks?', a: 'Stem cell therapy is generally well-tolerated. Mild side effects may include temporary inflammation at the injection site. Serious adverse events are rare.' },
  { q: 'How do I know if I am eligible?', a: 'Take our AI-powered self-assessment or schedule a consultation with our medical team for a comprehensive eligibility evaluation.' },
];

const typeLabels = ['All', 'Articles', 'Publications', 'FAQs', 'Guides'];
const typeMap: Record<number, string> = { 0: 'all', 1: 'article', 2: 'publication', 3: 'faq', 4: 'guide' };

export function ResourcesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = allResources.filter((r) => {
    const matchesType = activeTab === 0 || r.type === typeMap[activeTab];
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <main>
      <PageHero
        title="Knowledge Hub"
        subtitle="Explore our comprehensive library of articles, research publications, patient guides, and educational resources on regenerative medicine."
      />

      <SectionContainer>
        <ContentWrapper>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <Tabs tabs={typeLabels} activeTab={activeTab} onChange={setActiveTab} />
            <div className="relative w-full md:w-80">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400"
              />
            </div>
          </div>

          {filteredResources.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-500">No resources found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <FeatureCard key={resource.id}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 capitalize">{resource.type}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600">{resource.category}</span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">{resource.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">{resource.description}</p>
                  <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">{new Date(resource.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="text-sm font-medium text-primary-600 hover:text-primary-700 cursor-pointer">Read More →</span>
                  </div>
                </FeatureCard>
              ))}
            </div>
          )}
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer className="bg-neutral-50">
        <ContentWrapper>
          <SectionHeading title="Frequently Asked Questions" subtitle="Find answers to common questions about stem cell therapy." />
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq) => (
              <GlassCard key={faq.q} className="p-6">
                <h3 className="font-semibold text-neutral-900 mb-3">{faq.q}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{faq.a}</p>
              </GlassCard>
            ))}
          </div>
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer>
        <ContentWrapper>
          <div className="text-center max-w-2xl mx-auto">
            <SectionHeading title="Download Resources" subtitle="Access downloadable materials for patients and healthcare professionals." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Patient Guide', desc: 'Treatment overview for patients', format: 'PDF' },
                { title: 'Clinical Data', desc: 'Efficacy and safety data', format: 'PDF' },
                { title: 'Protocol Summary', desc: 'For healthcare providers', format: 'PDF' },
                { title: 'Research Brief', desc: 'Latest research highlights', format: 'PDF' },
              ].map((doc) => (
                <motion.div
                  key={doc.title}
                  whileHover={{ y: -2 }}
                  className="p-5 bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mb-3">
                    <span className="text-red-500 text-xs font-bold">{doc.format}</span>
                  </div>
                  <h4 className="font-semibold text-neutral-800 text-sm">{doc.title}</h4>
                  <p className="text-xs text-neutral-500 mt-1">{doc.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ContentWrapper>
      </SectionContainer>
    </main>
  );
}
