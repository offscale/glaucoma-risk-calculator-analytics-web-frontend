import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsersAdminComponent } from './users-admin.component';

describe('UsersAdminComponent', () => {
  let component: UsersAdminComponent;
  let fixture: ComponentFixture<UsersAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UsersAdminComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
