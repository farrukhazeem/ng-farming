import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperinviteComponent } from './superinvite.component';

describe('SuperinviteComponent', () => {
  let component: SuperinviteComponent;
  let fixture: ComponentFixture<SuperinviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperinviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperinviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
