import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-header-dropdown-tasks',
  templateUrl: './default-header-dropdown-tasks.component.html',
})
export class DefaultHeaderDropdownTasksComponent implements OnInit {
  public items = 15;

  constructor() {}

  ngOnInit(): void {}
}
