import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ReportsService {

	constructor(public http: HttpClient) { }

	addReportsData(reportsData) {
		return this.http.post('http://localhost:3000/api/add-reports', reportsData);
	}

	addReportsDetailsData(reportsData) {
		return this.http.post('http://localhost:3000/api/add-reports-details', reportsData);
	}

	getReportsData() {
		return this.http.get('http://localhost:3000/api/get-reports');
	}

	getReportsDataById(id) {
		return this.http.get(`http://localhost:3000/api/get-details-by-id/${id}`);
	}

	getReportsDetailByReportId(id) {
		return this.http.get(`http://localhost:3000/api/get-reports-details-by-report-id/${id}`);
	}
	
	getReportsDetailsData() {
		return this.http.get('http://localhost:3000/api/get-reports-details');
	}


	getReportsOfGrower(id) {
		return this.http.get(`http://localhost:3000/api/get-reports-by-growerId/${id}`);
	}


	deleteReportsById(id) {
		return this.http.delete(`http://localhost:3000/api/delete-reports-details/${id}`);
	}

	deleteCompleteReports(id) {
		return this.http.delete(`http://localhost:3000/api/delete-complete-report/${id}`);
	}

}
