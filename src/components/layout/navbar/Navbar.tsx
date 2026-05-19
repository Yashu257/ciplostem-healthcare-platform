import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES, ROUTE_PATHS } from '@/config/routes';
import { cn } from '@/utils/cn';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-neutral-100 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M12 6c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <span className="text-xl font-bold text-neutral-900 tracking-tight">
              Ciplo<span className="text-primary-600">Stem</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {ROUTES.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  location.pathname === route.path
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-neutral-600 hover:text-primary-700 hover:bg-primary-50/50'
                )}
              >
                {route.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to={ROUTE_PATHS.AI_ASSISTANT}
              className="px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
            >
              AI Assistant
            </Link>
            <Link
              to={ROUTE_PATHS.ASSESSMENT}
              className="px-5 py-2.5 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 transition-all shadow-md shadow-cyan-500/20"
            >
              Start Assessment
            </Link>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-neutral-100 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {ROUTES.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={cn(
                    'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    location.pathname === route.path
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  )}
                >
                  {route.label}
                </Link>
              ))}
              <div className="pt-3 space-y-2">
                <Link
                  to={ROUTE_PATHS.AI_ASSISTANT}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-primary-700 bg-primary-50/50"
                >
                  AI Assistant
                </Link>
                <Link
                  to={ROUTE_PATHS.ASSESSMENT}
                  className="block px-4 py-3 rounded-xl text-sm font-semibold text-white text-center bg-gradient-to-r from-cyan-500 to-teal-500"
                >
                  Start Assessment
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
