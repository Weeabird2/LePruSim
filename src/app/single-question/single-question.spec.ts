import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleQuestion } from './single-question';

describe('SingleQuestion', () => {
  let component: SingleQuestion;
  let fixture: ComponentFixture<SingleQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleQuestion],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleQuestion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
