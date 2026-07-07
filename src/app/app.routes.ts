import { Routes } from '@angular/router';
import { Home } from './home/home';
import { QuestionPageComponent } from './question-page/question-page';
import { QuestionCatalog } from './question-catalog/question-catalog';
import { QuestionDetails } from './question-details/question-details';
import { ExamCatalog } from './exam-catalog/exam-catalog';
import { ExamSimulation } from './exam-simulation/exam-simulation';
import { SingleQuestion } from './single-question/single-question';
import { ExamSetups } from './exam-setups/exam-setups';
import { RandomSimulation } from './random-simulation/random-simulation';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'question-page/:examId/:topicId', component: QuestionPageComponent },
  { path: 'question-catalog', component: QuestionCatalog },
  { path: 'question-details/:examId/:topicId', component: QuestionDetails },
  { path: 'exam-catalog', component: ExamCatalog },
  { path: 'exam-simulation/:examId', component: ExamSimulation},
  { path: 'single-question/:examId/:topicId/:questionId', component: SingleQuestion},
  { path: 'exam-setups', component: ExamSetups },
  { path: 'random-simulation/:catalogId', component: RandomSimulation },
];