import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BugService {

	constructor(public http: HttpClient) { }


  addBug(data) {
		console.log('add-bug data service ::', data);
		return this.http.post('http://localhost:3000/api/add-bug', data);
	}

  editBug(data) {
		console.log('edit-bug data service ::', data);
		return this.http.post('http://localhost:3000/api/edit-bug', data);
	}


	getBugData(){
		return this.http.get('http://localhost:3000/api/get-bug')	 
  }
  
}
