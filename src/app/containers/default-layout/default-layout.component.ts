import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { INavData, SidebarComponent, SidebarNavComponent } from '@coreui/angular';

import {TranslateService} from 'ng2-translate/ng2-translate'
import { languages } from '../../shared/shared.data';
import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent  implements OnInit {
  @ViewChild(SidebarNavComponent, { static: false }) childC: SidebarNavComponent;
  @HostBinding('class.c-app') cAppClass = true;

  public navItems:INavData[] = [];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private translate:TranslateService) {

    var lang:any = localStorage.getItem("lang");
    if(lang != null)
    {
      this.translate.use(lang) ;
    }
    else{
      this.translate.use(languages[0]);
    }
    
  }
  ngOnInit()
  {
    var navNames:string[] = [];
    for(var i=0;i<navItems.length;i++)
    {
      navNames.push(navItems[i].name);
    }
    
    this.translate.get(navNames).subscribe(res => {
      this.navItems = navItems;
      for(var i=0;i<navNames.length;i++)
      {
        this.navItems[i].name = res[navNames[i]];
        
      }
    });
  }
}
