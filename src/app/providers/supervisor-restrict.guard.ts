import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SupervisorRestrictGuard implements CanActivate {
	constructor(private router : Router,private auth : AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    	if (this.auth.isLoggednIn()) {
			let user_data1 = localStorage.getItem('user_data');
			let user_data = JSON.parse(user_data1);
			let roles = user_data['http://localhost:4200/app_metadata'].roles[0];

			if (roles === 'supervisor'){
				 console.log('ifffffffffffff')
				return true;
			}
			else {
				this.router.navigate(['/']);
				return false;
			}
		}
		else {
			this.router.navigate(["login"]);
			return false;
		}
  }
}
