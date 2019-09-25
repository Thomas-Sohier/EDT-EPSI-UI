import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { Semaine } from 'src/app/cours';
var NextDayPlanningComponent = /** @class */ (function () {
    function NextDayPlanningComponent(coursService) {
        this.coursService = coursService;
        this.re = /\//gi;
        this.incrementDay = 0;
        this.mobile = false;
        this.todayDate = new Date();
        this.date = new Date();
        this.semaine = new Semaine([]);
        this.jours = new Map();
        this.weekday = new Array(7);
    }
    NextDayPlanningComponent.prototype.ngOnInit = function () {
        if (window.screen.width <= 960) {
            // 768px portrait
            this.mobile = true;
        }
        this.setWeekDay();
        this.loadData();
        this.incrementDay = this.todayDate.getDay();
    };
    NextDayPlanningComponent.prototype.setWeekDay = function () {
        this.weekday[1] = 'Lundi';
        this.weekday[2] = 'Mardi';
        this.weekday[3] = 'Mercredi';
        this.weekday[4] = 'Jeudi';
        this.weekday[5] = 'Vendredi';
        this.weekday[6] = 'Samedi';
        this.weekday[7] = 'Dimanche';
    };
    NextDayPlanningComponent.prototype.getMonday = function (d) {
        d = new Date(d);
        var day = d.getDay();
        var diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff)).toLocaleDateString().replace(this.re, '-');
    };
    NextDayPlanningComponent.prototype.getNextWeek = function () {
        var _this = this;
        this.date.setDate(this.date.getDate() + 7);
        this.jours.clear();
        this.semaine.jours = [];
        this.coursService.getWeekByDate(this.getMonday(this.date)).subscribe(function (cours) {
            Object.keys(cours).forEach(function (key) {
                _this.jours.set(key.toString(), cours[key]);
            });
            _this.jours.forEach(function (v, k) {
                v.jour = k;
                _this.semaine.jours.push(v);
            });
        });
    };
    NextDayPlanningComponent.prototype.getNextDay = function () {
        var _this = this;
        if (this.semaine.jours.length <= this.incrementDay + 1) {
            this.date.setDate(this.date.getDate() + 7);
            this.jours.clear();
            this.semaine.jours = [];
            this.coursService.getWeekByDate(this.getMonday(this.date)).subscribe(function (cours) {
                Object.keys(cours).forEach(function (key) {
                    _this.jours.set(key.toString(), cours[key]);
                });
                _this.jours.forEach(function (v, k) {
                    v.jour = k;
                    _this.semaine.jours.push(v);
                });
            });
            this.incrementDay = -1;
        }
        this.incrementDay++;
        this.currentJour = this.semaine.jours[this.incrementDay - 1];
    };
    NextDayPlanningComponent.prototype.getPrevWeek = function () {
        var _this = this;
        this.date.setDate(this.date.getDate() - 7);
        this.jours.clear();
        this.semaine.jours = [];
        this.coursService.getWeekByDate(this.getMonday(this.date)).subscribe(function (cours) {
            Object.keys(cours).forEach(function (key) {
                _this.jours.set(key.toString(), cours[key]);
            });
            _this.jours.forEach(function (v, k) {
                v.jour = k;
                _this.semaine.jours.push(v);
            });
        });
    };
    NextDayPlanningComponent.prototype.getPrevDay = function () {
        var _this = this;
        if (1 > this.incrementDay - 1) {
            this.date.setDate(this.date.getDate() - 7);
            this.jours.clear();
            this.semaine.jours = [];
            this.coursService.getWeekByDate(this.getMonday(this.date)).subscribe(function (cours) {
                Object.keys(cours).forEach(function (key) {
                    _this.jours.set(key.toString(), cours[key]);
                });
                _this.jours.forEach(function (v, k) {
                    v.jour = k;
                    _this.semaine.jours.push(v);
                });
            });
            this.incrementDay = 7;
        }
        this.incrementDay--;
        this.currentJour = this.semaine.jours[this.incrementDay - 1];
    };
    NextDayPlanningComponent.prototype.loadData = function () {
        var _this = this;
        this.coursService.getWeekByDate(this.getMonday(this.todayDate)).subscribe(function (cours) {
            Object.keys(cours).forEach(function (key) {
                _this.jours.set(key.toString(), cours[key]);
                if (_this.weekday[_this.todayDate.getDay()] === key) {
                    _this.currentJour = cours[key];
                }
            });
            _this.jours.forEach(function (v, k) {
                v.jour = k;
                _this.semaine.jours.push(v);
            });
            console.log(_this.semaine.jours[4].cours);
        });
    };
    NextDayPlanningComponent = tslib_1.__decorate([
        Component({
            selector: 'app-next-day-planning',
            templateUrl: './next-day-planning.component.html',
            styleUrls: ['./next-day-planning.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [CoursService])
    ], NextDayPlanningComponent);
    return NextDayPlanningComponent;
}());
export { NextDayPlanningComponent };
//# sourceMappingURL=next-day-planning.component.js.map