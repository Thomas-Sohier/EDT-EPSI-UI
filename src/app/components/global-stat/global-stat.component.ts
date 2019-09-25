import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { Semaine } from 'src/app/cours';
import { enumSemaine } from 'src/app/enumSemaine';
import * as Highcharts from 'highcharts';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-global-stat',
  templateUrl: './global-stat.component.html',
  styleUrls: ['./global-stat.component.css']
})
export class GlobalStatComponent implements OnInit {
  cours = new Map<string, Semaine>();
  graphDataMap = new Map<string, number>();
  enumSemaine: enumSemaine;
  graphData = [];
  chart: Highcharts.Chart;

  public options: any = {
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

  constructor(
    private coursService: CoursService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'refresh',
      sanitizer.bypassSecurityTrustResourceUrl('assets/refresh.svg')
    );
  }

  async ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.coursService.getAllWeek().subscribe(cours => {
      Object.keys(cours).forEach(key => {
        this.cours.set(key.toString(), JSON.parse(cours[key]));
      });
      this.showList();
    });
  }

  showList() {
    let i = 0;
    let updatedValue = 0;

    this.graphDataMap.clear();
    this.graphData = [];

    this.cours.forEach(v => {
      for (const item in enumSemaine) {
        if (v[item].length !== 0) {
          while (v[item].length > i) {
            this.graphData.push(v[item][i].horaires);
            updatedValue = 0;
            if (this.graphDataMap.has(v[item][i].horaires)) {
              updatedValue = this.graphDataMap.get(v[item][i].horaires);
            }
            this.graphDataMap.set(v[item][i].horaires, updatedValue + 1);
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
  }
}
