import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SectionContainer,
  ContentWrapper,
  PageHero,
  SectionHeading,
  PrimaryButton,
  InputField,
  TextAreaField,
  InfoCard,
} from '@/components/ui';

const contactInfo = [
  { title: 'General Inquiries', detail: 'info@ciplostem.com', icon: '✉️' },
  { title: 'Patient Support', detail: 'patients@ciplostem.com', icon: '🏥' },
  { title: 'Medical Affairs', detail: 'medical@ciplostem.com', icon: '👨‍⚕️' },
  { title: 'Research Partnerships', detail: 'research@ciplostem.com', icon: '🔬' },
];

const hospitals = [
  { name: 'CiploStem Center - Boston', address: '200 Longwood Ave, Boston, MA 02115', phone: '+1 (617) 555-0100' },
  { name: 'CiploStem Center - San Francisco', address: '500 Parnassus Ave, San Francisco, CA 94143', phone: '+1 (415) 555-0200' },
  { name: 'CiploStem Center - Houston', address: '1515 Holcombe Blvd, Houston, TX 77030', phone: '+1 (713) 555-0300' },
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  return (
    <main>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with our team for inquiries about stem cell therapy, partnerships, or patient support. We're here to help."
      />

      <SectionContainer>
        <ContentWrapper>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Send Us a Message</h2>
              <p className="text-neutral-600 mb-8">Fill out the form below and our team will respond within 24 hours.</p>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField
                    label="First Name"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                  <InputField
                    label="Last Name"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                  <InputField
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <InputField
                    label="Phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="mt-5">
                  <InputField
                    label="Subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
                <div className="mt-5">
                  <TextAreaField
                    label="Message"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <div className="mt-6">
                  <PrimaryButton className="w-full sm:w-auto">Send Message</PrimaryButton>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-neutral-100 shadow-sm">
                      <span className="text-xl">{info.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{info.title}</p>
                        <p className="text-sm text-primary-600 mt-0.5">{info.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <InfoCard>
                <h4 className="font-semibold text-neutral-900 mb-2">Office Hours</h4>
                <p className="text-sm text-neutral-600">Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                <p className="text-sm text-neutral-600">Saturday: 9:00 AM - 2:00 PM EST</p>
                <p className="text-sm text-neutral-600">Sunday: Closed</p>
              </InfoCard>

              <InfoCard>
                <h4 className="font-semibold text-neutral-900 mb-2">Emergency Support</h4>
                <p className="text-sm text-neutral-600">For urgent medical inquiries, please call our 24/7 patient support line:</p>
                <p className="text-sm font-semibold text-primary-700 mt-1">+1 (800) 555-STEM</p>
              </InfoCard>
            </div>
          </div>
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer className="bg-neutral-50">
        <ContentWrapper>
          <SectionHeading title="Our Locations" subtitle="Visit one of our certified treatment centers." />
          <div className="grid md:grid-cols-3 gap-6">
            {hospitals.map((hospital) => (
              <motion.div
                key={hospital.name}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-neutral-100 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{hospital.name}</h3>
                <p className="text-sm text-neutral-600">{hospital.address}</p>
                <p className="text-sm text-primary-600 mt-2 font-medium">{hospital.phone}</p>
              </motion.div>
            ))}
          </div>
        </ContentWrapper>
      </SectionContainer>

      <SectionContainer>
        <ContentWrapper>
          <SectionHeading title="Find Us" subtitle="Visit our headquarters or one of our partner facilities." />
          <div className="bg-neutral-100 rounded-2xl overflow-hidden h-80 flex items-center justify-center border border-neutral-200">
            <div className="text-center">
              <svg className="w-12 h-12 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
              <p className="text-neutral-400 text-sm">Interactive map coming soon</p>
              <p className="text-neutral-400 text-xs mt-1">200 Longwood Ave, Boston, MA 02115</p>
            </div>
          </div>
        </ContentWrapper>
      </SectionContainer>
    </main>
  );
}
