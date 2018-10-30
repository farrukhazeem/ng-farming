import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionalSuperVisorRoutingModule } from "./regional-supervisor-routing.module";
import { DashboardRegionalComponent } from './components/dashboard-regional/dashboard-regional.component';
import { SupervisorsComponent } from './components/dashboard-regional/supervisors/supervisors.component';
import { FieldsComponent } from './components/dashboard-regional/fields/fields.component';
import { GrowersComponent } from './components/dashboard-regional/growers/growers.component';
import { InvitesComponent } from './components/dashboard-regional/invites/invites.component';
import { ReportsComponent } from './components/dashboard-regional/reports/reports.component';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { SearchPipe } from './pipes/search.pipe';
import { RegionalInviteComponent } from './components/regional-invite/regional-invite.component';
import { TableComponent } from './components/table/table.component';

import { CollapsibleModule } from 'angular2-collapsible';



@NgModule({
  imports: [
	CommonModule,
	RegionalSuperVisorRoutingModule,
	ReactiveFormsModule,
    FormsModule,
    CollapsibleModule,
  ],
  declarations: [SearchPipe,DashboardRegionalComponent, SupervisorsComponent, 
    FieldsComponent, GrowersComponent, InvitesComponent, 
    ReportsComponent,
    RegionalInviteComponent,
    TableComponent]
})
export class RegionalSupervisorModule { }
