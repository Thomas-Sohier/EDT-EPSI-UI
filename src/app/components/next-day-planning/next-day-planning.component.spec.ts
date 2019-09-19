import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextDayPlanningComponent } from './next-day-planning.component';

describe('NextDayPlanningComponent', () => {
  let component: NextDayPlanningComponent;
  let fixture: ComponentFixture<NextDayPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextDayPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextDayPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
