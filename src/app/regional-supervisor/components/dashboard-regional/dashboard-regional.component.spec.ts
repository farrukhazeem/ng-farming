import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRegionalComponent } from './dashboard-regional.component';

describe('DashboardRegionalComponent', () => {
  let component: DashboardRegionalComponent;
  let fixture: ComponentFixture<DashboardRegionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardRegionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
