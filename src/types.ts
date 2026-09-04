export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  role?: string;
  technologies: string[];
  description: string;
  visualConcept: string;
  highlights: string[];
  demoUrl?: string;
  githubUrl?: string;
  accentColor: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  passingYear: string;
  result: string;
  description: string;
  courses: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: 'it-support' | 'ambassador';
  responsibilities: string[];
  topologyNodes?: string[];
  description: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  tagline: string;
  color: string;
  skills: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  description: string;
  credentialType: string;
  accent: string;
}
