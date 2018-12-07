import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartManagerSerieComponent } from './smart-manager-serie.component';

describe('SmartManagerSerieComponent', () => {
  let component: SmartManagerSerieComponent;
  let fixture: ComponentFixture<SmartManagerSerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartManagerSerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartManagerSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
