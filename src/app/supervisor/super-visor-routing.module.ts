import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSupervisorComponent } from './components/dashboard-supervisor/dashboard-supervisor.component';
import { ReportsComponent } from './components/dashboard-supervisor/reports/reports.component';
import { GrowersComponent } from 'src/app/supervisor/components/dashboard-supervisor/growers/growers.component';
import { InvitesComponent } from 'src/app/supervisor/components/dashboard-supervisor/invites/invites.component';
import { FieldsComponent } from 'src/app/supervisor/components/dashboard-supervisor/fields/fields.component';
import { ContractComponent } from './components/dashboard-supervisor/contract/contract.component';
import { AuthGuard } from "../providers/auth.guard";
import { SupervisorRestrictGuard } from 'src/app/providers/supervisor-restrict.guard';
import { SuperinviteComponent } from 'src/app/super-supervisors/components/superinvite/superinvite.component';
// import { InviteMgmtComponent } from 'src/app/supervisor/components/invite-mgmt/invite-mgmt.component';



const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'supervisorDashboard',canActivate : [AuthGuard,SupervisorRestrictGuard], 
	component: DashboardSupervisorComponent, children : [
		{path : 'reports',component : ReportsComponent},
		{path : 'growers',component : GrowersComponent},
		{path : 'invites',component : InvitesComponent},		
		{path : 'fields',component : FieldsComponent},
		{path : 'contract',component : ContractComponent},		
				
		{path : 'inviteManagement',component :SuperinviteComponent },		
		
	]}

]
@NgModule({
    imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class SuperVisorRoutingModule { }