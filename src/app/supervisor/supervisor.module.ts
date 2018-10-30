import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperVisorRoutingModule } from "./super-visor-routing.module";
import { DashboardSupervisorComponent } from './components/dashboard-supervisor/dashboard-supervisor.component';
import { ReportsComponent } from './components/dashboard-supervisor/reports/reports.component';
import { GrowersComponent } from './components/dashboard-supervisor/growers/growers.component';
import { InvitesComponent } from './components/dashboard-supervisor/invites/invites.component';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { SearchPipe } from './pipes/search.pipe';
import { FieldsComponent } from './components/dashboard-supervisor/fields/fields.component';
import { LoaderComponent } from './components/dashboard-supervisor/loader/loader.component';
import { ContractComponent } from './components/dashboard-supervisor/contract/contract.component';
// import { SuperinviteComponent } from 'src/app/super-supervisors/components/superinvite/superinvite.component';

@NgModule({
  imports: [
	CommonModule,
	SuperVisorRoutingModule,
	FormsModule,
	ReactiveFormsModule,
  ],
	declarations: [SearchPipe,DashboardSupervisorComponent, ReportsComponent, GrowersComponent, InvitesComponent, 
		FieldsComponent, LoaderComponent, ContractComponent ]
})
export class SupervisorModule { }
