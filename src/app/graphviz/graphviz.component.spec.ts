import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GraphvizComponent } from './graphviz.component';

describe('GraphvizComponent', () => {
  let component: GraphvizComponent;
  let fixture: ComponentFixture<GraphvizComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphvizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphvizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
