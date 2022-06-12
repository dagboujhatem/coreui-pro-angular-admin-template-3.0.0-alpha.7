import { Component, HostBinding } from '@angular/core';

@Component({
  templateUrl: '404.component.html',
})
export class P404Component {
  @HostBinding('class') classes = 'c-app c-default-layout flex-row align-items-center';

  constructor() {}
}
