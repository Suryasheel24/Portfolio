export interface EducationCredential {
  degree: string;
  institution: string;
  period: string;
  status: string;
  isCompleted?: boolean;
  variant?: 'mint' | 'cyan';
  description: string;
}
