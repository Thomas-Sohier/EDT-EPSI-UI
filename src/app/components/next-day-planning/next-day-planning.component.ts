import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { Semaine, Cour } from 'src/app/cours';

@Component({
  selector: 'app-next-day-planning',
  templateUrl: './next-day-planning.component.html',
  styleUrls: ['./next-day-planning.component.css']
})
export class NextDayPlanningComponent implements OnInit {
  todayDate = new Date();
  semaine: Array<Semaine> = [];
  cours = new Map<string, Semaine>();
  constructor(private coursService: CoursService) {}

  ngOnInit() {
    console.log(this.getMonday(this.todayDate));
    this.loadData();
  }

  getMonday(d) {
    const re = /\//gi;
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff)).toLocaleDateString().replace(re, '-');
  }

  loadData() {
    this.coursService.getWeekByDate(this.getMonday(this.todayDate)).subscribe(cours => {
      Object.keys(cours).forEach(key => {
        this.cours.set(key.toString(), cours[key]);
      });
      this.cours.forEach((v, k) => {
        v.jours = k;
        this.semaine.push(v);
      });
    });
  }
}
