import { Component, OnInit } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-email-header',
  templateUrl: './email-header.component.html',
})
export class EmailHeaderComponent extends HeaderComponent implements OnInit {
  constructor(private classToggler: ClassToggleService) {
    super();
  }

  ngOnInit(): void {}

  toggleTheme() {
    this.classToggler.toggle('.c-app', 'c-dark-theme');
  }
}
