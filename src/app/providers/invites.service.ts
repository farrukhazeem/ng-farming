import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from, ObservableInput } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class InvitesService {

	constructor(public auth: AuthService, public http: HttpClient) { }

	addInvites(data) {

		return this.http.post('http://localhost:3000/api/add-invites', data);

	}

	addInvitesDetails(data) {

		return this.http.post('http://localhost:3000/api/add-invites-details', data);

	}


	getInvitesDetails() {
		return this.http.get('http://localhost:3000/api/get-invites-details')
	}

	getInvitesData() {
		return this.http.get('http://localhost:3000/api/get-invites')
	}


	getInvitesDataById(id) {
		console.log(id);
		return this.http.get(`http://localhost:3000/api/get-invites-by-id/${id}`)
	}


	removeInviteDetailById(id) {
		return this.http.delete(`http://localhost:3000/api/delete-invites-details/${id}`)
	}

	getInvitesDetailsByInviteId(id) {
		return this.http.get(`http://localhost:3000/api/get-invites-details-by-inviteid/${id}`)
	}

	removeCompleteInvite(id) {
		return this.http.delete(`http://localhost:3000/api/delete-complete-invite/${id}`)
	}

}
