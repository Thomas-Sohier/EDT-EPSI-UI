import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CoursService } from 'src/app/services/cours.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Semaine } from 'src/app/cours';
import { enumSemaine } from 'src/app/enumSemaine';

interface data {
  name: string;
  y: number;
  drilldown: string;
}

class data {
  public name: string;
  public y: number;
  public drilldown: string;

  constructor(name: string, y: number, drilldown: string) {
    this.name = name;
    this.y = y;
    this.drilldown = drilldown;
  }
}

@Component({
  selector: 'app-time-prof',
  templateUrl: './time-prof.component.html',
  styleUrls: ['./time-prof.component.css']
})
export class TimeProfComponent implements OnInit {
  cours = new Map<string, Semaine>();
  graphDataMap = new Map<string, number>();
  graphData: data[] = [];
  chart: Highcharts.Chart;
  enumSemaine: enumSemaine;

  public options: any = {
    chart: {
      type: 'pie',
      height: 700
    },
    title: {
      text: 'Répartition des heures entre professeurs'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f} %</b> <br/> total : <b>{point.y} h</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [
      {
        name: 'Pourcentage',
        colorByPoint: true,
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

  async loadData() {
    this.coursService.getAllWeek().subscribe(cours => {
      Object.keys(cours).forEach(key => {
        this.cours.set(key.toString(), JSON.parse(cours[key]));
      });
      this.parseData();
    });
  }

  parseHour(hour, min, hour2, min2) {
    let calculatedHour = (hour2 - hour) * 60;
    let calculatedMin = min2 - min;
    return (calculatedHour + calculatedMin) / 60;
  }

  addData() {
    this.graphDataMap.forEach((v: number, x: string) => {
      this.graphData.push(new data(x, v, x));
    });
    this.options.series[0].data = this.graphData;
    Highcharts.chart('container', this.options);
  }

  parseData() {
    let updatedValue = 0;
    let heure = 0;

    this.graphDataMap.clear();
    this.graphData = [];

    this.cours.forEach(v => {
      for (const item in enumSemaine) {
        if (v[item] !== null) {
          v[item].forEach(b => {
            heure = this.parseHour(
              b.horaires.substring(0, 2),
              b.horaires.substring(3, 5),
              b.horaires.substring(8, 10),
              b.horaires.substring(11, 13)
            );
            if (this.graphDataMap.has(b.prof)) {
              updatedValue = this.graphDataMap.get(b.prof);
            }
            this.graphDataMap.set(b.prof, updatedValue + heure);
          });
        }
      }
    });
    this.addData();
  }
}
