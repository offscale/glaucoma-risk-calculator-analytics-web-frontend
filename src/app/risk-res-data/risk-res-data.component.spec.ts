import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskResDataComponent } from './risk-res-data.component';

describe('RiskResDataComponent', () => {
  let component: RiskResDataComponent;
  let fixture: ComponentFixture<RiskResDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskResDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskResDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
