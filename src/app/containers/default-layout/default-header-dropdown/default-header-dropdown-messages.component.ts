import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-header-dropdown-messages',
  templateUrl: './default-header-dropdown-messages.component.html',
})
export class DefaultHeaderDropdownMessagesComponent implements OnInit {
  public items = 7;

  constructor() {}

  ngOnInit(): void {}
}
