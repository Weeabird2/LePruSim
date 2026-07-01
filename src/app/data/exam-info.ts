import { TopicInfo } from './topic-info';

export interface ExamInfo {
  id: string;
  title: string;
  topics: TopicInfo[];
}
