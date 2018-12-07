import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFavoriComponent } from './gestion-favori.component';

describe('GestionFavoriComponent', () => {
  let component: GestionFavoriComponent;
  let fixture: ComponentFixture<GestionFavoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionFavoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionFavoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
