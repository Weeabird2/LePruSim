import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Questions } from '../service/questions';
import { Question } from '../data/question';

@Component({
  selector: 'app-question-details',
  imports: [],
  templateUrl: './question-details.html',
  styleUrl: './question-details.css',
})
export class QuestionDetails {
  questions: Question[] = [];
  examId = '';
  topicId = '';

  constructor(
    private route: ActivatedRoute,
    public questionService: Questions,
  ) {}
  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId') ?? '';

    this.topicId = this.route.snapshot.paramMap.get('topicId') ?? '';
    console.log(this.examId);
    console.log(this.topicId);

    this.questionService.getQuestions(this.examId, this.topicId).subscribe({
      next: (questions) => {
        console.log(questions);
        this.questions = questions;
      },
      error: (err) => {
        console.error('Fragen können nicht geladen werden:', err);
      },
    });
  }
}
