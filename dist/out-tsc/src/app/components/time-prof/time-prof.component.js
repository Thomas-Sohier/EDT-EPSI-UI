import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CoursService } from 'src/app/services/cours.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { enumSemaine } from 'src/app/enumSemaine';
var TimeProfComponent = /** @class */ (function () {
    function TimeProfComponent(coursService, iconRegistry, sanitizer) {
        this.coursService = coursService;
        this.cours = new Map();
        this.graphDataMap = new Map();
        this.graphData = [];
        this.options = {
            chart: {
                type: 'pie',
                height: 700
            },
            title: {
                text: 'Pourcentage de professeurs'
            },
            credits: {
                enabled: false
            },
            tooltip: {},
            xAxis: {
                categories: []
            },
            series: []
        };
        iconRegistry.addSvgIcon('refresh', sanitizer.bypassSecurityTrustResourceUrl('assets/refresh.svg'));
    }
    TimeProfComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadData();
        this.parseData();
        setTimeout(function () {
            _this.parseData();
        }, 500);
    };
    TimeProfComponent.prototype.loadData = function () {
        var _this = this;
        this.coursService.getAllWeek().subscribe(function (cours) {
            Object.keys(cours).forEach(function (key) {
                _this.cours.set(key.toString(), JSON.parse(cours[key]));
            });
        });
    };
    TimeProfComponent.prototype.parseHour = function (hour, min, hour2, min2) {
        var calculatedHour = (hour2 - hour) * 60;
        var calculatedMin = min2 - min;
        return (calculatedHour + calculatedMin) / 60;
    };
    TimeProfComponent.prototype.parseData = function () {
        var _this = this;
        var i = 0;
        var updatedValue = 0;
        var heure = 0;
        this.graphDataMap.clear();
        this.graphData = [];
        this.cours.forEach(function (v) {
            for (var item in enumSemaine) {
                v[item].forEach(function (b) {
                    heure = _this.parseHour(b.horaires.substring(0, 2), b.horaires.substring(3, 5), b.horaires.substring(8, 10), b.horaires.substring(11, 13));
                    if (_this.graphDataMap.has(b.prof)) {
                        updatedValue = _this.graphDataMap.get(b.prof);
                    }
                    _this.graphDataMap.set(b.prof, updatedValue + heure);
                });
            }
        });
        Object.keys(this.graphDataMap).forEach(function (key) {
            _this.data.name = key;
            _this.data.y = _this.graphDataMap.get(key);
            _this.data.drilldown = key;
            console.log(_this.data);
            _this.options.series.push(_this.data);
        });
        Highcharts.chart('container', this.options);
    };
    TimeProfComponent = tslib_1.__decorate([
        Component({
            selector: 'app-time-prof',
            templateUrl: './time-prof.component.html',
            styleUrls: ['./time-prof.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [CoursService,
            MatIconRegistry,
            DomSanitizer])
    ], TimeProfComponent);
    return TimeProfComponent;
}());
export { TimeProfComponent };
//# sourceMappingURL=time-prof.component.js.map