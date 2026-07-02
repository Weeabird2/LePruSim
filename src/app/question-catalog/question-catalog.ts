import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Catalog } from '../service/catalog';
@Component({
  selector: 'app-question-catalog',
  imports: [RouterLink],
  templateUrl: './question-catalog.html',
  styleUrl: './question-catalog.css',
})
export class QuestionCatalog {
  openExamId?: string;
  constructor(public catalogService: Catalog) {}

  toggleExam(examId: string): void {
    this.openExamId = this.openExamId === examId ? undefined : examId;
  }
}
