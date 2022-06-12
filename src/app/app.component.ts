import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import {TranslateService} from 'ng2-translate/ng2-translate';

import {languages} from './shared/shared.data';
@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, public iconSet: IconSetService,private translate:TranslateService) {
    // iconSet singleton
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
    translate.addLangs(languages);
    translate.setDefaultLang(languages[0]);
    translate.use(languages[0]);
    
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
