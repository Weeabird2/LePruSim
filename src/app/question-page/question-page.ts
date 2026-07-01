import { Component } from '@angular/core';

interface Question {
  type: 'sc' | 'mc' | 'fi';
  text: string;
  options?: string[];
}

@Component({
  selector: 'app-question-page',
  standalone: true,
  templateUrl: './question-page.html',
})
export class QuestionPageComponent {
  currentQuestion: Question = {
    type: 'fi',
    text: 'Was ist der Standard-Befehl, um in ein Verzeichnis zu wechseln?',
    options: ['cd', 'ls', 'dir', 'pwd']
  };
}
