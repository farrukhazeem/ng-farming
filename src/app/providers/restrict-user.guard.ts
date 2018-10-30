import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot ,NavigationEnd} from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router,Event as NavigationEvent } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
	providedIn: 'root'
})
export class RestrictUserGuard implements CanActivate {
	constructor(private router: Router, private activatedRoute: ActivatedRoute,private auth: AuthService) {
		console.log('restrict auth guard 1')

	}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


		if (this.auth.isLoggednIn()) {
			let user_data1 = localStorage.getItem('user_data');
			let user_data = JSON.parse(user_data1);
			let roles = user_data['http://localhost:4200/app_metadata'].roles[0];
			if (roles === 'super_supervisor') {
				console.log('restrict auth guard 2', roles)
				return true;
			}
			else {
				this.router.navigate(['/']);
				return false;
			}

			// if (roles === 'admin') {
			// 	this.router.navigate(['dashboard']);
			// 	return false;
			// }
			// else if (roles === 'supervisor') {
			// 	this.router.navigate(['supervisorDashboard'])
			// 	return false;
			// }
			// else if (roles === 'super_supervisor') {
			// 	// this.router.navigate(['superSupervisorDashboard'])
			// 	return false;
			// }
			// else if (roles === 'regional supervisor') {
			// 	this.router.navigate(['regionalSupervisorDashboard'])
			// 	return false;
			// }
			// else {
			// 	return false;
			// }
			// return true;
		}
		else {
			this.router.navigate(["login"]);
			return false;
		}
		// return true;
	}
}
