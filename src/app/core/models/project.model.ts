export interface ProjectAction {
  label: string;
  url: string;
  isPrimary?: boolean;
  external?: boolean;
}

export interface ProjectMockup {
  urlText: string;
  tagText: string;
  tagColor?: string;
  variant?: 'mint' | 'cyan' | 'purple';
  type?: 'code' | 'stepper' | 'tokens';
  barHeights?: number[];
}

export interface Project {
  id: string;
  kicker: string;
  kickerVariant?: 'mint' | 'cyan' | 'purple';
  title: string;
  description: string;
  tags: string[];
  mockup: ProjectMockup;
  actions: ProjectAction[];
}

