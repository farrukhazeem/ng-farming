import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";

@Injectable()
export class LoginGuard implements CanActivate {
	constructor(private router: Router, private auth: AuthService) {
		console.warn('login guard ===============')
	}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		
		if(this.auth.isLoggednIn()){
			let user_data1 = localStorage.getItem('user_data')
		let user_data = JSON.parse((user_data1));
		
		 let roles = user_data['http://localhost:4200/app_metadata'].roles[0];
		 console.log('roles',roles)
			switch (roles) {
				case 'admin':
				this.router.navigate(['dashboard'])
				break;
				case 'supervisor':
				this.router.navigate(['supervisorDashboard']);
				break;
				case 'regional supervisor':
				this.router.navigate(['regionalSupervisorDashboard']);
				case 'super_supervisor':
				this.router.navigate(['superSupervisorDashboard']);
				break;			
				default:
				
					break;
			}
			return false;
		}else{
			return true;
		}
		// if( == null){
		// 	console.warn('nulllllllll!!!!')
		// 	return false;
		//   }else{
		// 	console.warn('nottt  nulllllllll!!!!')			  
		// 	return fas;
		//   }	
	// return true;
  }
}
