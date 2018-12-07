import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartManagerFilmComponent } from './smart-manager-film.component';

describe('SmartManagerFilmComponent', () => {
  let component: SmartManagerFilmComponent;
  let fixture: ComponentFixture<SmartManagerFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartManagerFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartManagerFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
