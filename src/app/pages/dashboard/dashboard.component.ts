import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import {languages} from '../../shared/shared.data';
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private translate:TranslateService) {
    translate.addLangs(languages);
    translate.setDefaultLang(languages[0]);
  }

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts(): void {
  }
}
