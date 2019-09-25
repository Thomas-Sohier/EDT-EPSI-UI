import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { Semaine, Cour, Journee } from 'src/app/cours';

@Component({
  selector: 'app-next-day-planning',
  templateUrl: './next-day-planning.component.html',
  styleUrls: ['./next-day-planning.component.css']
})
export class NextDayPlanningComponent implements OnInit {
  re = /\//gi;
  incrementDay = 0;
  mobile = false;
  todayDate = new Date();
  date = new Date();
  semaine = new Semaine([]);
  jours = new Map<string, Journee>();
  currentJour: Journee;
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
    this.weekday[1] = 'Lundi';
    this.weekday[2] = 'Mardi';
    this.weekday[3] = 'Mercredi';
    this.weekday[4] = 'Jeudi';
    this.weekday[5] = 'Vendredi';
    this.weekday[6] = 'Samedi';
    this.weekday[7] = 'Dimanche';
  }

  getMonday(d) {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff)).toLocaleDateString().replace(this.re, '-');
  }

  getNextWeek() {
    this.date.setDate(this.date.getDate() + 7);
    this.jours.clear();
    this.semaine.jours = [];
    this.coursService.getWeekByDate(this.getMonday(this.date)).subscribe(cours => {
      Object.keys(cours).forEach(key => {
        this.jours.set(key.toString(), cours[key]);
      });
      this.jours.forEach((v, k) => {
        v.jour = k;
        this.semaine.jours.push(v);
      });
    });
  }

  getNextDay() {
    this.incrementDay++;
    this.currentJour = this.semaine.jours[this.todayDate.getDay() - 1 + this.incrementDay];

    if (this.todayDate.getDay() + this.incrementDay === 7) {
      this.date.setDate(this.date.getDate() + 7);
      this.jours.clear();
      this.semaine.jours = [];
      this.coursService.getWeekByDate(this.getMonday(this.date)).subscribe(cours => {
        Object.keys(cours).forEach(key => {
          this.jours.set(key.toString(), cours[key]);
        });
        this.jours.forEach((v, k) => {
          v.jour = k;
          this.semaine.jours.push(v);
        });
      });
      this.incrementDay = 0;
    }
  }

  getPrevWeek() {
    this.date.setDate(this.date.getDate() - 7);
    this.jours.clear();
    this.semaine.jours = [];
    this.coursService.getWeekByDate(this.getMonday(this.date)).subscribe(cours => {
      Object.keys(cours).forEach(key => {
        this.jours.set(key.toString(), cours[key]);
      });
      this.jours.forEach((v, k) => {
        v.jour = k;
        this.semaine.jours.push(v);
      });
    });
  }

  getPrevDay() {
    this.incrementDay--;
    this.currentJour = this.semaine.jours[this.todayDate.getDay() - 1 + this.incrementDay];
  }

  loadData() {
    this.coursService.getWeekByDate(this.getMonday(this.todayDate)).subscribe(cours => {
      Object.keys(cours).forEach(key => {
        this.jours.set(key.toString(), cours[key]);

        if (this.weekday[this.todayDate.getDay()] === key) {
          this.currentJour = cours[key];
        }
      });
      this.jours.forEach((v, k) => {
        v.jour = k;
        this.semaine.jours.push(v);
      });
    });
  }
}
