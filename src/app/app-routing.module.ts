import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalStatComponent } from './components/global-stat/global-stat.component';
import { NextDayPlanningComponent } from './components/next-day-planning/next-day-planning.component';
import { TimeProfComponent } from './components/time-prof/time-prof.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'globalStat', component: GlobalStatComponent },
  { path: 'nextDayPlanning', component: NextDayPlanningComponent },
  { path: 'timeProfGraph', component: TimeProfComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
