import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from, ObservableInput } from 'rxjs';
import { Promise } from 'q';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(public http: HttpClient) { }

  //   add district data
	addRegion(data) {
		console.log('district data service ::', data);
		let districtBody = {
			"region_name": data.districtName
		}
		return this.http.post('http://localhost:3000/api/add-region', districtBody);

	}

	
	
  //   add district data
	editRegion(data) {	
		return this.http.post('http://localhost:3000/api/edit-region', data);
	}

	
	
	getDistrictData(){
		return this.http.get('http://localhost:3000/api/get-region')	 
	}
}
