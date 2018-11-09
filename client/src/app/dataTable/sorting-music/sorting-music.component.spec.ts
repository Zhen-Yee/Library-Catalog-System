import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingMusicComponent } from './sorting-music.component';

describe('SortingMusicComponent', () => {
  let component: SortingMusicComponent;
  let fixture: ComponentFixture<SortingMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortingMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
