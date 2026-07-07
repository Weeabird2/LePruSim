import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam-setups',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './exam-setups.html'
})
export class ExamSetups implements OnInit {
  questionCount = signal<number>(60);
  timeLimit = signal<number>(60);
  mode = '';

  catalogs = [
    {id: 'lpic101', name: 'LPIC-1 101'},
    {id: 'lpic102', name: 'LPIC-1 102'},
    {id: 'lpic103', name: 'LPIC-1 103'},
  ];

  topics = [
    {id: 'lpic101a', name: 'LPIC-1 101 - Teil A'},
    {id: 'lpic101b', name: 'LPIC-1 101 - Teil B'},
    {id: 'lpic101c', name: 'LPIC-1 101 - Teil C'},
    {id: 'lpic101d', name: 'LPIC-1 101 - Teil D'},
    {id: 'lpic101e', name: 'LPIC-1 101 - Teil E'},
    {id: 'lpic102a', name: 'LPIC-1 102 - Teil A'},
    {id: 'lpic102b', name: 'LPIC-1 102 - Teil B'},
    {id: 'lpic102c', name: 'LPIC-1 102 - Teil C'},
    {id: 'lpic102d', name: 'LPIC-1 102 - Teil D'},
    {id: 'lpic102e', name: 'LPIC-1 102 - Teil E'},
    {id: 'lpic102f', name: 'LPIC-1 102 - Teil F'},
    {id: 'lpic102g', name: 'LPIC-1 102 - Teil G'},
  ];

  selectedCatalog = signal<string>(this.catalogs[0].id);
  selectedTopic = signal<string>(this.topics[0].id);

  constructor( 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.mode = params.get('mode') ?? 'exam';
    });
  }

  updateTimer(newCount: number) {
    this.questionCount.set(newCount);
    this.timeLimit.set(newCount);
  }

  startExam() {
    const isRandom = this.mode === 'random';
    const selectionId = isRandom ? this.selectedCatalog(): this.selectedTopic();
    const finalCount = isRandom ? this.questionCount() : 60;
    const finalTime = isRandom ? this.timeLimit() : 60;
    const targetRoute = isRandom ? '/random-simulation': '/exam-simulation';

    this.router.navigate([targetRoute, selectionId], {
      queryParams: {
        count: finalCount,
        time: finalTime
      }
    });
  }
}
