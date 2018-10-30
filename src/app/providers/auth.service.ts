// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { resolve } from 'q';
(window as any).global = window;

declare var async;

@Injectable()
export class AuthService {
  route: any;
  userProfile: any;
  idTokenPayload;
  // auth0 = new auth0.WebAuth({
  //   clientID: 'zDohnX2IAHaQCOzpKeVVU2C0F5BMu2hl',
  //   domain: 'auth-ng6-start.auth0.com',
  //   responseType: 'token id_token',
  //   audience: 'https://auth-ng6-start.auth0.com/api/v2/',
  //   redirectUri: 'http://localhost:4200/callback',
  //   scope: 'openid profile create:users'
  // });

  auth0 = new auth0.WebAuth({
    clientID: 'hKrUGqWikPZYO4gdpqTohWAMu6SyMm1U',
    domain: 'sapwin.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://sapwin.eu.auth0.com/api/v2/',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile create:users'
  });

  constructor(public router: Router) { }

  public login(): void {
    this.auth0.authorize();
  }
  getToken() {
	let user_data1 = localStorage.getItem('user_data')
	let user_data = JSON.parse((user_data1));
	let unique_id =  user_data && user_data.sub;
	return unique_id;
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }


  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      console.log('authResult', authResult);


      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        // this.router.navigate(['dashboard']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.getProfile()
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_data');

    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }


  getProfile(cb?) {
    const accessToken = localStorage.getItem('access_token');

    return new Promise((res, rej) => {

      if (!accessToken) {
        rej('Access Token must exist to fetch profile');
      }

      // const self = this;
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        console.log("profile=>", profile);
        this.idTokenPayload = decode(localStorage.getItem('id_token'));
        localStorage.setItem('user_data', JSON.stringify((profile)));

        console.log(this.idTokenPayload['http://localhost:4200/First_Name']);
        console.log(this.idTokenPayload);

        let user_roles = profile['http://localhost:4200/app_metadata'].roles[0];
        console.log(user_roles);


        if (user_roles == "admin") {
          this.router.navigateByUrl('/dashboard');
        }
        else if (user_roles == "super_supervisor") {
          this.router.navigateByUrl('/superSupervisorDashboard');
        }
        else if (user_roles == "regional supervisor") {
          this.router.navigateByUrl('/regionalSupervisorDashboard');
        }
        else {
          this.router.navigateByUrl('/supervisorDashboard');
        }



        if (profile) {
          res(profile);
          // this.suserProfile = profile;
          // resolve(profile);
        }

        rej('an error occured!')
        // cb(err, profile);
        // https://github.com/auth0/auth0.js/issues/433.
      });

    })


    // return new Promise((resolve, reject) => {
    //   resolve(this.userProfile)

    // })

  }


  public getUserProfile(): Promise<any> {
    console.log(this.userProfile);

    return new Promise((resolve, reject) => {
      resolve(this.userProfile)
      if (this.userProfile) {
        console.warn('promise resolveeeeeeeeeeeeeeeeeeeeee-------------')
      }
      // else {
      //   reject({ err: "error" })
      // }
    });
  }

}