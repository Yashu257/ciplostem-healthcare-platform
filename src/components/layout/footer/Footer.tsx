import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/config/routes';
import { ContentWrapper } from '@/components/ui';

const footerLinks = {
  platform: [
    { label: 'Home', path: ROUTE_PATHS.HOME },
    { label: 'About Us', path: ROUTE_PATHS.ABOUT },
    { label: 'For Patients', path: ROUTE_PATHS.PATIENTS },
    { label: 'For Doctors', path: ROUTE_PATHS.DOCTORS },
  ],
  resources: [
    { label: 'Knowledge Hub', path: ROUTE_PATHS.RESOURCES },
    { label: 'Publications', path: ROUTE_PATHS.RESOURCES },
    { label: 'FAQs', path: ROUTE_PATHS.RESOURCES },
    { label: 'AI Assistant', path: ROUTE_PATHS.AI_ASSISTANT },
  ],
  support: [
    { label: 'Contact Us', path: ROUTE_PATHS.CONTACT },
    { label: 'Self-Assessment', path: ROUTE_PATHS.ASSESSMENT },
    { label: 'Find a Hospital', path: ROUTE_PATHS.CONTACT },
    { label: 'Support Center', path: ROUTE_PATHS.CONTACT },
  ],
};

const trustIndicators = [
  'FDA Compliant',
  'HIPAA Compliant',
  'ISO 13485',
  'GMP Certified',
];

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="border-b border-neutral-800">
        <ContentWrapper className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    <path d="M12 6c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Ciplo<span className="text-primary-400">Stem</span>
                </span>
              </Link>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mb-6">
                Pioneering the future of regenerative medicine through advanced stem cell therapy solutions and innovative healthcare technology.
              </p>
              <div className="flex flex-wrap gap-2">
                {trustIndicators.map((indicator) => (
                  <span
                    key={indicator}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-400 border border-neutral-700"
                  >
                    {indicator}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Platform</h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.path + link.label}>
                    <Link to={link.path} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.path + link.label}>
                    <Link to={link.path} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.path + link.label}>
                    <Link to={link.path} className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ContentWrapper>
      </div>

      <ContentWrapper>
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} CiploStem. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors text-sm">Cookie Policy</a>
          </div>
          <div className="flex items-center gap-3">
            {['LinkedIn', 'Twitter', 'ResearchGate'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-primary-400 hover:bg-neutral-700 transition-all"
                aria-label={social}
              >
                <span className="text-xs font-bold">{social[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </ContentWrapper>
    </footer>
  );
}
