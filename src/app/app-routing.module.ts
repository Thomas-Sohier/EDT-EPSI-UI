import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalStatComponent } from './components/global-stat/global-stat.component';
import { NextDayPlanningComponent } from './components/next-day-planning/next-day-planning.component';
import { TimeProfComponent } from './components/time-prof/time-prof.component';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { HomeComponent } from './home';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
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
