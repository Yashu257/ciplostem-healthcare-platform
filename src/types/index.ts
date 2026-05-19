export interface NavLink {
  label: string;
  path: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  type: 'single' | 'multi' | 'text';
  options?: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'article' | 'publication' | 'faq' | 'guide';
  date: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}
