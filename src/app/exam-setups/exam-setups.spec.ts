import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSetups } from './exam-setups';

describe('ExamSetups', () => {
  let component: ExamSetups;
  let fixture: ComponentFixture<ExamSetups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamSetups],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamSetups);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
