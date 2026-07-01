import { Routes } from '@angular/router';
import { Home } from './home/home';
import { QuestionPageComponent } from './question-page/question-page';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'question-page', component: QuestionPageComponent}
];
