import { Routes } from '@angular/router';
import { Home } from './home/home';
import { QuestionPageComponent } from './question-page/question-page';
import { QuestionCatalog } from './question-catalog/question-catalog';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'question-page', component: QuestionPageComponent },
  { path: 'question-catalog', component: QuestionCatalog },
];
