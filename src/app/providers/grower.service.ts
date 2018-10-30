import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from, ObservableInput } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GrowerService {

	constructor(public http: HttpClient) { }

	addGrower(data) {
		console.log('district data service ::', data);
		return this.http.post('http://localhost:3000/api/add-grower', data);

	}

	editGrower(data) {
		console.log('district data service ::', data);
		return this.http.post('http://localhost:3000/api/edit-grower', data);

	}


	getGrowerData() {
		return this.http.get('http://localhost:3000/api/get-grower')
	}


	getGrowerById(id) {
		return this.http.get(`http://localhost:3000/api/get-grower-by-creator/${id}`)
	}

	getGrowerByRegionId(id) {
		return this.http.get(`http://localhost:3000/api/get-grower-by-regionId/${id}`)
	}
}
