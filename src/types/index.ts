export type QuestionType = 'chat';
export type Gender = 'male' | 'female' | null;
export type TestMode = 'romance' | 'full' | null;

export interface ScoreOption {
  p: number; // Rational (清醒) vs Delusional (恋爱脑)
  u: number; // Unyielding (强硬) vs Submissive (讨好)
  a: number; // Autonomous (独立) vs Dependent (依赖)
  x: number; // Sharp (鉴婊) vs Blind (盲从)
}

export interface AnswerOption {
  id: string;
  text: string;
  scores: ScoreOption;
}

export interface Question {
  id: string;
  targetGender?: Gender; // null or undefined means suitable for both
  relationshipStage?: 'friend' | 'dating' | 'engaged' | 'married' | 'ex';
  type: QuestionType;
  scenario: string; // Background text or the message from the other person
  options: AnswerOption[];
  senderName: string;
  category: 'romance' | 'work' | 'family' | 'social';
}

export type CategoryScores = Record<Question['category'], ScoreOption>;

export interface ResultDetails {
  title: string;
  desc: string;
  dangerLevel: string;
  keywords: string[];
  animal: string;
  bestMatch: string;   // 天生一对的代号
  worstMatch: string;  // 天生仇敌的代号
}