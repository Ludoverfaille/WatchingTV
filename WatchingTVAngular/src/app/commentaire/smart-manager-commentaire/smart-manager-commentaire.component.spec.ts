import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartManagerCommentaireComponent } from './smart-manager-commentaire.component';

describe('SmartManagerCommentaireComponent', () => {
  let component: SmartManagerCommentaireComponent;
  let fixture: ComponentFixture<SmartManagerCommentaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartManagerCommentaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartManagerCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
