import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUsersSideNavComponent } from './active-users-side-nav.component';

describe('ActiveUsersSideNavComponent', () => {
  let component: ActiveUsersSideNavComponent;
  let fixture: ComponentFixture<ActiveUsersSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveUsersSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUsersSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
