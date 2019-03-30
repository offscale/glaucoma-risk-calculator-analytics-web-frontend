import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskResValuesComponent } from './risk-res-values.component';

describe('RiskResValuesComponent', () => {
  let component: RiskResValuesComponent;
  let fixture: ComponentFixture<RiskResValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskResValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskResValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
