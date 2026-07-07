import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomSimulation } from './random-simulation';

describe('RandomSimulation', () => {
  let component: RandomSimulation;
  let fixture: ComponentFixture<RandomSimulation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomSimulation],
    }).compileComponents();

    fixture = TestBed.createComponent(RandomSimulation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
