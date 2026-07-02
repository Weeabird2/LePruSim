import { Component } from '@angular/core';
import { Question } from '../data/question';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question-page',
  standalone: true,
  templateUrl: './question-page.html',
})
export class QuestionPageComponent {
  currentQuestion?: Observable<Question>;
}
