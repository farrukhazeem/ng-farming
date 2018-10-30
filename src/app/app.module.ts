import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";

import { AuthModule } from './auth/auth.module';
import { AuthService } from './providers/auth.service';
import { AuthGuard } from './providers/auth.guard';
import { LoginGuard } from './providers/login.guard';
import { CreateUserService } from './providers/create-user.service';
import { AdminModule } from 'src/app/admin/admin.module';
import { RegionalSupervisorModule } from 'src/app/regional-supervisor/regional-supervisor.module';
import { SuperSupervisorsModule } from 'src/app/super-supervisors/super-supervisors.module';
import { SupervisorModule } from 'src/app/supervisor/supervisor.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { CollapsibleModule } from 'angular2-collapsible';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    AdminModule,
    CollapsibleModule,
    RegionalSupervisorModule,
    SuperSupervisorsModule,
    SupervisorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
	AuthGuard,
	LoginGuard,
    CreateUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
