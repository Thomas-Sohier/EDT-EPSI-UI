import { async, TestBed } from '@angular/core/testing';
import { NextDayPlanningComponent } from './next-day-planning.component';
describe('NextDayPlanningComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [NextDayPlanningComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(NextDayPlanningComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=next-day-planning.component.spec.js.map