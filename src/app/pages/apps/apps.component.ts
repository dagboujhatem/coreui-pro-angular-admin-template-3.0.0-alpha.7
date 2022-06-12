import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { languages } from '../../shared/shared.data';
import {IAppData,allAppsData,installedAppsData} from './apps-data';
@Component({
  templateUrl: 'apps.component.html',
  styleUrls: ['apps.component.scss'],
})
export class AppsComponent implements OnInit {
  @ViewChild("asideToggle", {static: false}) asideToggle: ElementRef;
  allAppsData:any = allAppsData;
  installedAppsData = installedAppsData;

  currentApp:IAppData = null;
  asideShow :any = false;
  installedMode:any = true;
  constructor(private translate:TranslateService) {
    var lang:any = localStorage.getItem("lang");
    if(lang != null)
    {
      translate.use(lang);
    }
    else{
      translate.use(languages[0]);
    }
   }

  ngOnInit(): void {
    
  }
  get getallAppsData()
  {
    return this.allAppsData.filter(a=>!a.installState)
  }
  changeMode()
  {
    this.installedMode = !this.installedMode;
  }
  removeApp(i:any)
  {
    this.installedAppsData.splice(i,1);
  }
  editApp(app:any)
  {
    this.currentApp = app;
    this.toggleAside();
  }
  installApp(app:any)
  {
    this.currentApp = app;
    this.toggleAside();
  }
  cancel()
  {
    this.toggleAside();
  }
  confirm()
  {
    this.toggleAside();
    if(!this.installedMode)
    {
      this.currentApp.installState = true;
      this.installedAppsData.push(this.currentApp);
      this.installedMode = true;
    }
  }
  toggleAside()
  {
    this.asideShow =  !this.asideShow;
    this.asideToggle.nativeElement.click();
  }
}
