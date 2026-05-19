export const COLORS = {
  primary: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
} as const;

export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  teal: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
  hero: 'linear-gradient(135deg, #ecfeff 0%, #f0fdfa 50%, #ffffff 100%)',
  cta: 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)',
  glass: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
} as const;

export const SPACING = {
  section: { y: 'py-20 lg:py-28', x: 'px-4 sm:px-6 lg:px-8' },
  container: 'max-w-7xl mx-auto',
} as const;

export const TYPOGRAPHY = {
  hero: 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight',
  h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight',
  h2: 'text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight',
  h3: 'text-xl sm:text-2xl font-semibold tracking-tight',
  h4: 'text-lg font-semibold',
  body: 'text-base leading-relaxed',
  bodyLg: 'text-lg leading-relaxed',
  caption: 'text-sm text-neutral-500',
  button: 'text-sm font-semibold tracking-wide',
} as const;

export const ANIMATION = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  stagger: {
    animate: { transition: { staggerChildren: 0.1 } },
  },
  scaleOnHover: {
    whileHover: { scale: 1.02 },
    transition: { duration: 0.2 },
  },
} as const;
