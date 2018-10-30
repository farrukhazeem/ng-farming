import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRegionalComponent } from './components/dashboard-regional/dashboard-regional.component';
import { ReportsComponent } from './components/dashboard-regional/reports/reports.component';
import { FieldsComponent } from './components/dashboard-regional/fields/fields.component';
import { GrowersComponent } from './components/dashboard-regional/growers/growers.component';
import { InvitesComponent } from './components/dashboard-regional/invites/invites.component';
import { SupervisorsComponent } from './components/dashboard-regional/supervisors/supervisors.component';
import { AuthGuard } from "../providers/auth.guard";
import { RegionalRestrictGuard } from 'src/app/providers/regional-restrict.guard';

import { RegionalInviteComponent } from 'src/app/regional-supervisor/components/regional-invite/regional-invite.component';
import { TableComponent } from 'src/app/regional-supervisor/components/table/table.component';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'regionalSupervisorDashboard', component: DashboardRegionalComponent, children : [
		{path : 'fields',component : FieldsComponent},
		{path : 'growers',component : GrowersComponent},
		{path: 'invitesManagement',component: RegionalInviteComponent},
		{path : 'invites',component : InvitesComponent},
		{path : 'reports',component : ReportsComponent},
		{path : 'supervisors',component : SupervisorsComponent},
		{path : 'table',component : TableComponent},
		
	]}

]
@NgModule({
    imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class RegionalSuperVisorRoutingModule { }
