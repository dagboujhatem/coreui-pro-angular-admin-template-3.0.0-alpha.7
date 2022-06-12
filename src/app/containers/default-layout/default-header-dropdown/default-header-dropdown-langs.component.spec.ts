import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultHeaderDropdownLangsComponent } from './default-header-dropdown-langs.component';

describe('DefaultHeaderDropdownLangsComponent', () => {
  let component: DefaultHeaderDropdownLangsComponent;
  let fixture: ComponentFixture<DefaultHeaderDropdownLangsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultHeaderDropdownLangsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      DefaultHeaderDropdownLangsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
