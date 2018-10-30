import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
// import { tokenNotExpired } from 'angular2-jwt';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private auth: AuthService) {
		console.log('auth guardddddddd =========')
	}

	canActivate() {
		if (this.auth.isLoggednIn()) {
			return true;
		}
		else {
			this.router.navigate(["login"]);
			return false;
		}
		//   return true;
	}
}