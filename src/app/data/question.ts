import { Answer } from './answer';

export interface Question {
  id: number;
  type: 'sc' | 'mc' | 'fi';
  questionText: string;
  answers: Answer[];
  hint?: string;
}
