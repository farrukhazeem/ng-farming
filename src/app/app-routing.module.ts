import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AdminModule } from "./admin/admin.module";

// import { LoginComponent } from './components/login/login.component';
// import { HomeComponent } from './components/home/home.component';
// import { CallbackComponent } from './components/callback/callback.component';

// import { AuthGuard } from "./providers/auth.guard";


const routes: Routes = [
//     { path: '', component: LoginComponent },
//     { path: 'login', component: LoginComponent },
//     { path: 'callback', component: CallbackComponent },
    // { path: 'home',loadChildren: () => AdminModule }
    



];

@NgModule({
    imports: [RouterModule.forRoot([])],
    exports: [RouterModule]
})
export class AppRoutingModule { }