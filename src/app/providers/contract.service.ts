import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(public http: HttpClient) { }

  addContract(data) {
    console.log('add-bug data service ::', data);

    return this.http.post('http://localhost:3000/api/add-contract', data);

  }

  getContract() {
    return this.http.get('http://localhost:3000/api/get-contract');
  }

  getContractByGrowerId(id) {
    return this.http.get(`http://localhost:3000/api/get-contract-by-growerid/${id}`);
  }

  editContract(data) {
    return this.http.post('http://localhost:3000/api/edit-contract', data);

  }

}
