import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSuperSupervisorComponent } from './dashboard-super-supervisor.component';

describe('DashboardSuperSupervisorComponent', () => {
  let component: DashboardSuperSupervisorComponent;
  let fixture: ComponentFixture<DashboardSuperSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSuperSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSuperSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
