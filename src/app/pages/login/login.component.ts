import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  @HostBinding('class') cAppClass = 'c-app flex-row align-items-center';
}
