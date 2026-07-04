import { Component, computed, OnInit, signal } from '@angular/core';
import { Question } from '../data/question';
import { ActivatedRoute } from '@angular/router';
import { Questions } from '../service/questions';
import { Answer } from '../data/answer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-question-page',
  standalone: true,
  templateUrl: './question-page.html',
})
export class QuestionPageComponent implements OnInit {
  questions = signal<Question[]>([]);
  currentIndex = signal(0);
  currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  examId = '';
  topicId = '';

  selectedAnswerId = signal<number[]>([]);
  textAnswer = signal<string>('');
  feedback = signal<string | null>(null);
  showSolution = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    public questionService: Questions,
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.examId = params.get('examId') ?? '';
      this.topicId = params.get('topicId') ?? '';

      console.log(this.examId);
      console.log(this.topicId);

      this.questionService.getQuestions(this.examId, this.topicId).subscribe({
        next: (questions) => this.questions.set(questions),
        error: (err) => console.error('Fragen können nicht geladen werden:', err),
      });
    });
  }

  onSelect(id: number, isRadio: boolean) {
    this.feedback.set(null);
    this.showSolution.set(false);

    if (isRadio) {
      this.selectedAnswerId.set([id]);
    } else {
      const current = this.selectedAnswerId();
      if (current.includes(id)) {
        this.selectedAnswerId.set(current.filter((x) => x !== id));
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
    const q = this.currentQuestion();
    if (!q) return;

    let isCorrect = false;
    if (q.type === 'sc' || q.type === 'mc') {
      const correctIds = q.answers
        .filter((a) => a.isCorrect)
        .map((a) => a.id)
        .sort();
      const selectedIds = this.selectedAnswerId().sort();
      isCorrect = JSON.stringify(correctIds) === JSON.stringify(selectedIds);
    } else if (q.type === 'fi') {
      const correctAnswer =
        q.answers
          .find((a) => a.isCorrect)
          ?.answerText.trim()
          .toLowerCase()
          .trim() || '';
      isCorrect = this.textAnswer().trim().toLowerCase() === correctAnswer;
    }
    this.feedback.set(isCorrect ? 'Richtig! ✅' : 'Falsch! ❌');
  }

  revealSolution() {
    this.showSolution.set(true);
  }

  flagged = signal<number[]>([]);

  toggleFlag(){
    const qId = this.currentQuestion()?.id;
    if(!qId) return;
    const current = [...this.flagged()];
    if(current.includes(qId)) {
      this.flagged.set(current.filter((id) => id !== qId));
    } else {
      this.flagged.set([...current, qId]);
    }
  }
  
  goTo(index: number){
    this.currentIndex.set(index);
    this.selectedAnswerId.set([]);
    this.textAnswer.set('');
    this.feedback.set(null);
    this.showSolution.set(false);
  }

  next() {
    this.selectedAnswerId.set([]);
    this.textAnswer.set('');
    this.feedback.set(null);
    this.showSolution.set(false);

    if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.set(this.currentIndex() + 1);
    } else {
      console.log('Ende der Fragenliste erreicht.');
    }
  }
}