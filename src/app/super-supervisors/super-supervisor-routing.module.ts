import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSuperSupervisorComponent } from './components/dashboard-super-supervisor/dashboard-super-supervisor.component';
import { RegionalSupervisorComponent } from '../super-supervisors/components/dashboard-super-supervisor/regional-supervisor/regional-supervisor.component';
import { SupervisorsComponent } from '../super-supervisors/components/dashboard-super-supervisor/supervisors/supervisors.component';
import { GrowersComponent } from '../super-supervisors/components/dashboard-super-supervisor/growers/growers.component';
import { FieldsComponent } from '../super-supervisors/components/dashboard-super-supervisor/fields/fields.component';
import { InvitesComponent } from '../super-supervisors/components/dashboard-super-supervisor/invites/invites.component';
import { ReportsComponent } from '../super-supervisors/components/dashboard-super-supervisor/reports/reports.component';
import { ContractComponent } from './components/dashboard-super-supervisor/contract/contract.component';
import { AuthGuard } from "../providers/auth.guard";
import { RestrictUserGuard } from 'src/app/providers/restrict-user.guard';
import { SuperinviteComponent } from 'src/app/super-supervisors/components/superinvite/superinvite.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'superSupervisorDashboard', canActivate : [AuthGuard,RestrictUserGuard],component: DashboardSuperSupervisorComponent ,children : [	
	{ path: 'regional', component: RegionalSupervisorComponent},
    { path: 'supervisors', component: SupervisorsComponent},
    { path: 'growers', component: GrowersComponent},
    { path: 'fields', component: FieldsComponent},
    { path: 'invites', component: InvitesComponent},
    { path: 'reports', component: ReportsComponent},
    {path : 'contract',component : ContractComponent},
    {path : 'inviteManagement',component : SuperinviteComponent},
]}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class SuperSuperVisorRoutingModule { }