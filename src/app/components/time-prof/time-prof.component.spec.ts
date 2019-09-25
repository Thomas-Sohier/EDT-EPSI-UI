import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeProfComponent } from './time-prof.component';

describe('TimeProfComponent', () => {
  let component: TimeProfComponent;
  let fixture: ComponentFixture<TimeProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
