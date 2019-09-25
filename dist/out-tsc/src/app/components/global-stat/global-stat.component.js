import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { enumSemaine } from 'src/app/enumSemaine';
import * as Highcharts from 'highcharts';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
var GlobalStatComponent = /** @class */ (function () {
    function GlobalStatComponent(coursService, iconRegistry, sanitizer) {
        this.coursService = coursService;
        this.cours = new Map();
        this.graphDataMap = new Map();
        this.graphData = [];
        this.options = {
            chart: {
                type: 'column',
                height: 700
            },
            title: {
                text: 'Nombre de tranches horaires'
            },
            credits: {
                enabled: false
            },
            tooltip: {},
            xAxis: {
                categories: []
            },
            series: [
                {
                    name: 'Heures',
                    turboThreshold: 500000,
                    data: []
                }
            ]
        };
        iconRegistry.addSvgIcon('refresh', sanitizer.bypassSecurityTrustResourceUrl('assets/refresh.svg'));
    }
    GlobalStatComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.loadData();
                this.showList();
                setTimeout(function () {
                    _this.showList();
                }, 500);
                return [2 /*return*/];
            });
        });
    };
    GlobalStatComponent.prototype.loadData = function () {
        var _this = this;
        this.coursService.getAllWeek().subscribe(function (cours) {
            Object.keys(cours).forEach(function (key) {
                _this.cours.set(key.toString(), JSON.parse(cours[key]));
            });
        });
    };
    GlobalStatComponent.prototype.showList = function () {
        var _this = this;
        var i = 0;
        var updatedValue = 0;
        this.graphDataMap.clear();
        this.graphData = [];
        this.cours.forEach(function (v) {
            for (var item in enumSemaine) {
                if (v[item].length !== 0) {
                    while (v[item].length > i) {
                        _this.graphData.push(v[item][i].horaires);
                        updatedValue = 0;
                        if (_this.graphDataMap.has(v[item][i].horaires)) {
                            updatedValue = _this.graphDataMap.get(v[item][i].horaires);
                        }
                        _this.graphDataMap.set(v[item][i].horaires, updatedValue + 1);
                        i++;
                    }
                    i = 0;
                }
            }
        });
        this.options.series[0].data = Array.from(this.graphDataMap.values());
        this.options.xAxis.categories = Array.from(this.graphDataMap.keys());
        console.log(this.graphDataMap);
        Highcharts.chart('container', this.options);
    };
    GlobalStatComponent = tslib_1.__decorate([
        Component({
            selector: 'app-global-stat',
            templateUrl: './global-stat.component.html',
            styleUrls: ['./global-stat.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [CoursService,
            MatIconRegistry,
            DomSanitizer])
    ], GlobalStatComponent);
    return GlobalStatComponent;
}());
export { GlobalStatComponent };
//# sourceMappingURL=global-stat.component.js.map