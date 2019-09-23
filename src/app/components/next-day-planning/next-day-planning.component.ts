import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { Semaine, Cour } from 'src/app/cours';

@Component({
  selector: 'app-next-day-planning',
  templateUrl: './next-day-planning.component.html',
  styleUrls: ['./next-day-planning.component.css']
})
export class NextDayPlanningComponent implements OnInit {
  re = /\//gi;
  mobile = false;
  todayDate = new Date();
  semaine: Array<Semaine> = [];
  cours = new Map<string, Semaine>();
  currentJour: Array<Cour>;
  weekday = new Array(7);

  constructor(private coursService: CoursService) {}

  ngOnInit() {
    if (window.screen.width <= 960) {
      // 768px portrait
      this.mobile = true;
    }
    this.setWeekDay();
    this.loadData();
  }

  setWeekDay() {
    this.weekday[0] = 'Lundi';
    this.weekday[1] = 'Mardi';
    this.weekday[2] = 'Mercredi';
    this.weekday[3] = 'Jeudi';
    this.weekday[4] = 'Vendredi';
    this.weekday[5] = 'Samedi';
    this.weekday[6] = 'Dimanche';
  }

  getMonday(d) {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff)).toLocaleDateString().replace(this.re, '-');
  }

  loadData() {
    this.coursService.getWeekByDate(this.getMonday(this.todayDate)).subscribe(cours => {
      Object.keys(cours).forEach(key => {
        this.cours.set(key.toString(), cours[key]);

        if (this.weekday[this.todayDate.getDay()] === key) {
          this.currentJour = cours[key];
          console.log(this.currentJour[0].groupe);
        }
      });
      this.cours.forEach((v, k) => {
        v.jours = k;
        this.semaine.push(v);
      });
    });
  }
}
