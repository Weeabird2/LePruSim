import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../data/question';

@Injectable({
  providedIn: 'root',
})
export class Questions {
  constructor(private http: HttpClient) {}
  getQuestions(examId: string, topicId: string): Observable<Question[]> {
    return this.http.get<Question[]>(`http:localhost:3000/api/questions/:examId/:topicId`);
  }
}
