import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultHeaderDropdownAccountComponent } from './default-header-dropdown-account.component';

describe('DefaultHeaderDropdownAccountComponent', () => {
  let component: DefaultHeaderDropdownAccountComponent;
  let fixture: ComponentFixture<DefaultHeaderDropdownAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultHeaderDropdownAccountComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultHeaderDropdownAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
