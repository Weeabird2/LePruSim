import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCatalog } from './question-catalog';

describe('QuestionCatalog', () => {
  let component: QuestionCatalog;
  let fixture: ComponentFixture<QuestionCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionCatalog],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionCatalog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
