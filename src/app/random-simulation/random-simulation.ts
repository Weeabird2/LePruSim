import { Component, computed, signal, OnDestroy, OnInit } from '@angular/core';
import { Question } from '../data/question';
import { ActivatedRoute } from '@angular/router';
import { Questions } from '../service/questions';

@Component({
  selector: 'app-random-simulation',
  standalone: true,
  templateUrl: './random-simulation.html',
})
export class RandomSimulation implements OnInit, OnDestroy {
  questions = signal<Question[]>([]);
  currentIndex = signal(0);
  currentQuestion = computed(() => this.questions()[this.currentIndex()]);

  userAnswers = signal<Record<number, (number | string)[]>>({});
  isFinished = signal(false);
  score = signal(0);

  timeLeft = signal(3600);
  timerInterval: any;
  examId = '';
  topicId = '';
mode: any;
selectedCatalog: any;
catalogs: any;
topics: any;

  constructor(
    private route: ActivatedRoute,
    public questionService: Questions,
  ) {}

  ngOnInit(): void {
    let questionCount = 60;

    this.route.queryParamMap.subscribe(params => {
      const timeParam = params.get('time');
      const countParam = params.get('count');
      if (timeParam) this.timeLeft.set(Number(timeParam) * 60);
      if (countParam) questionCount = Number(countParam);
    });

    this.route.paramMap.subscribe((params) => {
      const catalogId = params.get('catalogId') ?? '';

      this.questionService.getQuestions(catalogId, '').subscribe({
        next: (q) => {
          const randomSelection = q.sort(() => 0.5 - Math.random()).slice(0, questionCount);
          this.questions.set(randomSelection);
        },
        error: (err) => console.error('Fehler', err),
      });
    });
    
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft() > 0 && !this.isFinished()) {
        this.timeLeft.set(this.timeLeft() - 1);
      } else if (this.timeLeft() === 0 && !this.isFinished()) {
        this.finishExam();
      }
    }, 1000);
  }

  formatTime() {
    const m = Math.floor(this.timeLeft() / 60);
    const s = this.timeLeft() % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  onSelect(questionId: number, answerId: number, isRadio: boolean) {
    const current = { ...this.userAnswers() };
    if (isRadio) {
      current[questionId] = [answerId];
    } else {
      const selected = (current[questionId] as number[]) || [];
      if (selected.includes(answerId)) {
        current[questionId] = selected.filter((id) => id !== answerId);
      } else {
        current[questionId] = [...selected, answerId];
      }
    }
    this.userAnswers.set(current);
  }

  onTextInput(questionId: number, event: Event) {
    const val = (event.target as HTMLInputElement).value;
    const current = { ...this.userAnswers() };
    current[questionId] = [val];
    this.userAnswers.set(current);
  }

  next() {
    if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.set(this.currentIndex() + 1);
    }
  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.set(this.currentIndex() - 1);
    }
  }

  finishExam() {
    clearInterval(this.timerInterval);
    this.isFinished.set(true);
    let correctCount = 0;

    this.questions().forEach((q) => {
      const userAns = this.userAnswers()[q.id] || [];
      if (q.type === 'sc' || q.type === 'mc') {
        const correctIds = q.answers
          .filter((a) => a.isCorrect)
          .map((a) => a.id)
          .sort();
        const selectedIds = (userAns as number[]).sort();
        if (JSON.stringify(correctIds) === JSON.stringify(selectedIds)) correctCount++;
      } else if (q.type === 'fi') {
        const correctText =
          q.answers
            .find((a) => a.isCorrect)
            ?.answerText.toLowerCase()
            .trim() || '';
        const userText = ((userAns[0] as string) || '').toLowerCase().trim();
        if (correctText === userText) correctCount++;
      }
    });

    this.score.set(Math.round((correctCount / this.questions().length) * 100));
  }
}
