import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultHeaderDropdownMessagesComponent } from './default-header-dropdown-messages.component';

describe('DefaultHeaderDropdownMessagesComponent', () => {
  let component: DefaultHeaderDropdownMessagesComponent;
  let fixture: ComponentFixture<DefaultHeaderDropdownMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultHeaderDropdownMessagesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultHeaderDropdownMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
