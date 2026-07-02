import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { Question } from '../data/question';

@Injectable({
  providedIn: 'root',
})
export class Questions {
  question = signal<Question[]>([]);
  constructor(private http: HttpClient) {}

  getQuestions(examId: string, topicId: string): Observable<Question[]> {
    return this.http
      .get<Question[]>(`http://localhost:3000/api/questions/${examId}/${topicId}`)
      .pipe(tap((data) => this.question.set(data)));
  }
}
