import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingBookComponent } from './sorting-book.component';

describe('SortingBookComponent', () => {
  let component: SortingBookComponent;
  let fixture: ComponentFixture<SortingBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortingBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
