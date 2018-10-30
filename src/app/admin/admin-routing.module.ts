import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { LoginComponent } from './components/login/login.component';
// import { CallbackComponent } from './components/callback/callback.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { AuthGuard } from "./providers/auth.guard";
import { SuperSuperVisorComponent } from './components/dashboard/super-super-visor/super-super-visor.component';
import { ProductsComponent } from './components/dashboard/products/products.component';
import { DistrictsComponent } from './components/dashboard/districts/districts.component';
import { BugsComponent } from 'src/app/admin/components/dashboard/bugs/bugs.component';
import { AuthGuard } from "../../app/providers/auth.guard";
import { LoginGuard } from "../../app/providers/login.guard";
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { RestrictUserGuard } from 'src/app/providers/restrict-user.guard';
import { AdminRestrictGuard } from 'src/app/providers/admin-restrict.guard';




const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
	{ path: 'login', component: LoginComponent ,canActivate : [LoginGuard]},  
	{ path: 'dashboard', component: DashboardComponent ,canActivate : [AuthGuard,AdminRestrictGuard],children : [
		{ path: 'home', component: HomeComponent  },
		// {path: 'super-super-visors', component: SuperSuperVisorComponent},
		{path: 'products', component: ProductsComponent},
		{path: 'districts', component: DistrictsComponent},
		{path: 'bugs', component: BugsComponent}		
	]},
	
    
    // { path: 'login', component: LoginComponent },
    // { path: 'callback', component: CallbackComponent },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }