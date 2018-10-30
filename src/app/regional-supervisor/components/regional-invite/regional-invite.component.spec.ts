import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalInviteComponent } from './regional-invite.component';

describe('RegionalInviteComponent', () => {
  let component: RegionalInviteComponent;
  let fixture: ComponentFixture<RegionalInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
