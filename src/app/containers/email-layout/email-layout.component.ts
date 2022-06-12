import { Component, HostBinding } from '@angular/core';

import { navItems } from './_nav';

@Component({
  selector: 'app-email',
  templateUrl: './email-layout.component.html',
})
export class EmailLayoutComponent {
  @HostBinding('class.c-app') cAppClass = true;

  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}
}
