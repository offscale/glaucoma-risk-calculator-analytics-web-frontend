import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretDashboardComponent } from './secret-dashboard.component';

describe('SecretDashboardComponent', () => {
  let component: SecretDashboardComponent;
  let fixture: ComponentFixture<SecretDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecretDashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
