import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperSuperVisorRoutingModule } from "./super-supervisor-routing.module";
import { DashboardSuperSupervisorComponent } from './components/dashboard-super-supervisor/dashboard-super-supervisor.component';
import { RegionalSupervisorComponent } from './components/dashboard-super-supervisor/regional-supervisor/regional-supervisor.component';
import { SupervisorsComponent } from './components/dashboard-super-supervisor/supervisors/supervisors.component';
import { GrowersComponent } from './components/dashboard-super-supervisor/growers/growers.component';
import { FieldsComponent } from './components/dashboard-super-supervisor/fields/fields.component';
import { InvitesComponent } from './components/dashboard-super-supervisor/invites/invites.component';
import { ReportsComponent } from './components/dashboard-super-supervisor/reports/reports.component';
import { ContractComponent } from './components/dashboard-super-supervisor/contract/contract.component';

import { SearchPipe } from "./pipes/search.pipe";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { SuperinviteComponent } from 'src/app/super-supervisors/components/superinvite/superinvite.component';
@NgModule({
  imports: [

  CommonModule,
    SuperSuperVisorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [SearchPipe, SuperinviteComponent,
    DashboardSuperSupervisorComponent, RegionalSupervisorComponent, SupervisorsComponent, GrowersComponent, FieldsComponent, InvitesComponent, ReportsComponent, ContractComponent,]
})
export class SuperSupervisorsModule { }
