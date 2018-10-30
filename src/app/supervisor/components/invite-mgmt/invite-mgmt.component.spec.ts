import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteMgmtComponent } from './invite-mgmt.component';

describe('InviteMgmtComponent', () => {
  let component: InviteMgmtComponent;
  let fixture: ComponentFixture<InviteMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
