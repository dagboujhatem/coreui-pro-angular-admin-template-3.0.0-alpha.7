import { Component, OnInit } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  constructor(private classToggler: ClassToggleService) {
    super();
  }

  ngOnInit(): void {}

  toggleTheme() {
    this.classToggler.toggle('.c-app', 'c-dark-theme');
  }
}
