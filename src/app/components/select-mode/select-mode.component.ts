import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-select-mode',
  templateUrl: './select-mode.component.html',
  styleUrls: ['./select-mode.component.css']
})
export class SelectModeComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Planning',
        link: '/nextDayPlanning',
        index: 0
      },
      {
        label: 'Tranches horaires',
        link: '/globalStat',
        index: 1
      },
      {
        label: 'Répartition prof',
        link: '/timeProfGraph',
        index: 2
      }
    ];
  }

  ngOnInit() {
    this.router.events.subscribe(res => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find(tab => tab.link === '.' + this.router.url)
      );
    });
  }
}
