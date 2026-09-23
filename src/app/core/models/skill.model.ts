export interface SkillCategory {
  id: string;
  iconTag: string;
  variant: 'angular' | 'arch' | 'perf' | 'tools';
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
}
