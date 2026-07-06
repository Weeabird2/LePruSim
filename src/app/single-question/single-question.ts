import { Component, OnInit, signal } from '@angular/core';
import { Question } from '../data/question';
import { ActivatedRoute } from '@angular/router';
import { Questions } from '../service/questions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-single-question',
  standalone: true,
  templateUrl: './single-question.html',
})
export class SingleQuestion implements OnInit {
  question = signal<Question | null>(null);
  examId = '';
  topicId = '';
  questionId = 0;

  selectedAnswerId = signal<number[]>([]);
  textAnswer = signal<string>('');
  feedback = signal<string | null>(null);
  showSolution = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    public questionService: Questions,
    public location: Location
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.examId = params.get('examId') ?? '';
      this.topicId = params.get('topicId') ?? '';
      this.questionId = Number(params.get('questionId')) || 0;

      this.questionService.getQuestions(this.examId, this.topicId).subscribe({
        next: (questions) => {
          const q = questions.find(q => q.id === this.questionId);
          this.question.set(q || null);
        },
        error: (err) => console.error('Fehler:', err),
      });
    });
  }

  onSelect(id: number, isRadio: boolean) {
    this.feedback.set(null);
    if (isRadio){
      this.selectedAnswerId.set([id]);
    } else {
      const current = this.selectedAnswerId();
      if(current.includes(id)){
        this.selectedAnswerId.set(current.filter((i) => i !== id));
      } else {
        this.selectedAnswerId.set([...current, id]);
      }
    }
}

  onTextInput(event: Event) {
    this.textAnswer.set((event.target as HTMLInputElement).value);
    this.feedback.set(null);
    this.showSolution.set(false);
}

  check() {
    const q = this.question();
    if (!q) return;

    let isCorrect = false;
    if (q.type === 'sc' || q.type === 'mc') {
      const correctIds = q.answers.filter((a) => a.isCorrect).map((a) => a.id).sort();
      const selectedIds = this.selectedAnswerId().sort();
      isCorrect = JSON.stringify(correctIds) === JSON.stringify(selectedIds);
    } else if (q.type === 'fi') {
      const userAnswer = this.textAnswer().trim().toLowerCase();
      isCorrect = q.answers.some((a) =>a.isCorrect && a.answerText.trim().toLowerCase() === userAnswer);
    }
    this.feedback.set(isCorrect ? 'Richtig! ✅' : 'Falsch! ❌');
  }

  revealSolution() {
    this.showSolution.set(true);
  }

  goBack() {
    this.location.back();
  }
}