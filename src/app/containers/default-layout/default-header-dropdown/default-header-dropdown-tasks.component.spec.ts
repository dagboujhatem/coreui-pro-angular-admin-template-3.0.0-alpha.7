import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultHeaderDropdownTasksComponent } from './default-header-dropdown-tasks.component';

describe('DefaultHeaderDropdownTasksComponent', () => {
  let component: DefaultHeaderDropdownTasksComponent;
  let fixture: ComponentFixture<DefaultHeaderDropdownTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultHeaderDropdownTasksComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultHeaderDropdownTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
