import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SigninupComponent } from './signinup.component';

describe('SigninupComponent', () => {
  let component: SigninupComponent;
  let fixture: ComponentFixture<SigninupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SigninupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
