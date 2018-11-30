import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartManagerUtilisateurComponent } from './smart-manager-utilisateur.component';

describe('SmartManagerUtilisateurComponent', () => {
  let component: SmartManagerUtilisateurComponent;
  let fixture: ComponentFixture<SmartManagerUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartManagerUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartManagerUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
