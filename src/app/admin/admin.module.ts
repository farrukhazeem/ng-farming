import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/dashboard/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SuperSuperVisorComponent } from './components/dashboard/super-super-visor/super-super-visor.component';
import { ProductsComponent } from './components/dashboard/products/products.component';
import { DistrictsComponent } from './components/dashboard/districts/districts.component';
import { BugsComponent } from './components/dashboard/bugs/bugs.component';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	AdminRoutingModule,
	ToastrModule.forRoot()
  ],
  declarations: [SearchPipe,HomeComponent, DashboardComponent, SuperSuperVisorComponent, ProductsComponent, DistrictsComponent, BugsComponent]
})
export class AdminModule { }
