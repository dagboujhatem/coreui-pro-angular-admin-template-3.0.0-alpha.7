import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
})
export class RegisterComponent {
  @HostBinding('class') cAppClass = 'c-app flex-row align-items-center';

  constructor() {}
}
