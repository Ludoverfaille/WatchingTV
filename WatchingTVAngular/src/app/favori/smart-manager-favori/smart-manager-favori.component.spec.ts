import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartManagerFavoriComponent } from './smart-manager-favori.component';

describe('SmartManagerFavoriComponent', () => {
  let component: SmartManagerFavoriComponent;
  let fixture: ComponentFixture<SmartManagerFavoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartManagerFavoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartManagerFavoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
