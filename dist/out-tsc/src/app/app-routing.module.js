import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalStatComponent } from './components/global-stat/global-stat.component';
import { NextDayPlanningComponent } from './components/next-day-planning/next-day-planning.component';
import { TimeProfComponent } from './components/time-prof/time-prof.component';
var routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'globalStat', component: GlobalStatComponent },
    { path: 'nextDayPlanning', component: NextDayPlanningComponent },
    { path: 'timeProfGraph', component: TimeProfComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map