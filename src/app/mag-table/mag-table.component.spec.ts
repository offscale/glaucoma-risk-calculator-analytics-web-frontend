import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MagTableComponent } from './mag-table.component';

describe('MagTableComponent', () => {
  let component: MagTableComponent;
  let fixture: ComponentFixture<MagTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MagTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
