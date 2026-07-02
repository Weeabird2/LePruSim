import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-details',
  standalone: true,
  templateUrl: './question-details.html',
})
export class QuestionDetails {
  questions = [
    {id: 1, text: 'Was ist der Standard-Befehl, um in ein Verzeichnis zu wechseln?'},
    {id: 2, text: 'Wie listet man versteckte Dateien auf?'}
  ];

  constructor(private router: Router) {}

  openQuestion(id: number) {
    this.router.navigate(['/practice', id])
  }
}
