import { Component, HostBinding } from '@angular/core';

@Component({
  templateUrl: '500.component.html',
})
export class P500Component {
  @HostBinding('class') classes = 'c-app c-default-layout flex-row align-items-center';

  constructor() {}
}
