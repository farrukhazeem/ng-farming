import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  
	constructor(public http: HttpClient) { }
  addFields(data) {
		console.log('fields data service ::', data);
		return this.http.post('http://localhost:3000/api/add-field', data);

	}

	getFieldsData() {
		return this.http.get('http://localhost:3000/api/get-field')
	}


	getFieldById(id) {
		return this.http.get(`http://localhost:3000/api/get-field-by-growerid/${id}`)
	}

	editField(data) {
		console.log('fields edit service ::', data);
		return this.http.post('http://localhost:3000/api/edit-field', data)
		
	}

}
