import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { CallbackComponent } from './components/callback/callback.component';
// import { HomeComponent } from './components/home/home.component';
// import { AuthGuard } from "./providers/auth.guard";
import { LoginGuard } from "../../app/providers/login.guard";





const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    // { path: 'home', component: HomeComponent  },
    
    { path: 'login', component: LoginComponent },
    { path: 'callback', component: CallbackComponent },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }