import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserCrudDialogComponent } from './user-crud.dialog.component';

describe('UserCrudDialogComponent', () => {
  let component: UserCrudDialogComponent;
  let fixture: ComponentFixture<UserCrudDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserCrudDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCrudDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
