import type { NavLink } from '@/types';

export const ROUTES: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'For Patients', path: '/patients' },
  { label: 'For Doctors', path: '/doctors' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
];

export const ROUTE_PATHS = {
  HOME: '/',
  ABOUT: '/about',
  PATIENTS: '/patients',
  DOCTORS: '/doctors',
  RESOURCES: '/resources',
  CONTACT: '/contact',
  ASSESSMENT: '/assessment',
  AI_ASSISTANT: '/ai-assistant',
} as const;
