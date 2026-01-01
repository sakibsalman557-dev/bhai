
export enum MembershipTier {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}

export interface UserProfile {
  name: string;
  age: number;
  course: string;
  strengthAreas: string[];
  focusGoals: string[];
  cognitiveScore: number;
  productivityLevel: number;
  iqBaseline: number;
  tier: MembershipTier;
}

export interface CognitiveActivity {
  id: string;
  type: 'Memory' | 'Logic' | 'Creativity' | 'Focus';
  difficulty: number;
  score: number;
  timestamp: Date;
}

export interface Task {
  id: string;
  name: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'Doing' | 'Done';
  productivityScore: number;
  deadline: string;
}

export enum AppRoute {
  DASHBOARD = 'dashboard',
  TRAINING = 'training',
  TASKS = 'tasks',
  ANALYTICS = 'analytics',
  AI_TIPS = 'ai-tips',
  AI_TWIN = 'ai-twin',
  REWARDS = 'rewards',
  SETTINGS = 'settings',
  HELP = 'help'
}
