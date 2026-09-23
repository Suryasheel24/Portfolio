export interface ExperienceMilestone {
  role: string;
  company: string;
  period: string;
  variant?: 'mint' | 'cyan' | 'purple';
  achievements: string[];
  techStack: string[];
}
