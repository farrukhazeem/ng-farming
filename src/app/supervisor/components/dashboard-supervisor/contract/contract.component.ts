import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GrowerService } from '../../../../providers/grower.service';
import { ProductsService } from '../../../../providers/products.service';
import { ContractService } from '../../../../providers/contract.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  constructor(private fb: FormBuilder, private gs: GrowerService, private productService: ProductsService, private cs: ContractService) { }
  createContractForm: FormGroup;
  growerDropDown = [];
  productDropDown = [];
  contractData = [];
  displayTable = [];
  growersDataSupervisor = [];
  showContractData = [];

  ngOnInit() {
    this.createForm();
    this.apiCall();
  }


  apiCall() {

    this.gs.getGrowerData().subscribe((data) => {
      this.growerDropDown = data['data'];
      console.log("Grower", this.growerDropDown);
    }, (error) => {
      console.log(error)
    }, () => {
      this.GrowerApi()
    });


  }


  GrowerApi() {
  let uid = this.loginUid();
  this.gs.getGrowerById(uid).subscribe((data) => {
    console.log('growersDataSupervisordata', data['data']);
    this.growersDataSupervisor = [...this.growersDataSupervisor, ...data['data']];
  }, (error) => {
  }, () => {
    
    this.productApi();
  });
  }


  productApi() {
    this.productService.getProductsData().subscribe(data => {
      this.productDropDown = data['data'];
      console.log(this.productDropDown);
    }, (error) => {
      console.log(error);
    }, () => {
      this.contactApi()
    })

  }

  contactApi() {

    this.cs.getContract().subscribe(data => {
      console.log('data >>>', data);
      // this.contractData = data['data'];
      this.contractData = [...this.contractData, ...data['data']];
      console.log(this.contractData)
    }, (error) => {
      console.log(error);
    }, () => {
      this.filterData();
      // this.createShowTable();
    })
  }

  createForm() {
    this.createContractForm = this.fb.group({
      grower_id: ['', Validators.required],
      product_id: ['', Validators.required],
      amount: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
  }

  createContract() {
    console.log(this.createContractForm.value);

    this.cs.addContract(this.createContractForm.value).subscribe((data) => {
      this.contractData = [...this.contractData, ...data['data']];
      console.log(data);

    }, (error) => {
      console.log(error);
    }, () => {
      this.createShowTable();
    })
  }

  filterData() {

    for (let i = 0; i < this.contractData.length; ++i) {
      for (let j = 0; j < this.growersDataSupervisor.length; ++j) {
        
        if (this.contractData[i]['grower_id'] == this.growersDataSupervisor[j]['_id']) {
          console.log('=========>>>>>>', this.showContractData);
          
          this.showContractData.push(this.contractData[i]);
        }
      }

      if( i == this.contractData.length - 1) {
        console.log('index', i);
        
        this.createShowTable();
      }

    }
  }

  loginUid() {
    let user_data1 = localStorage.getItem('user_data')
    let user_data = JSON.parse((user_data1));
    let uid = user_data.sub;
    return uid;
  }



  createShowTable() {
    this.displayTable = [];
    console.log(this.showContractData);
    for (let i = 0; i < this.showContractData.length; ++i) {
      let obj = {
        grower_id: this.findGrowerById(this.showContractData[i].grower_id),
        product_id: this.findProductById(this.showContractData[i].product_id),
        amount: this.showContractData[i].amount,
        start_date: this.showContractData[i].start_date,
        end_date: this.showContractData[i].end_date,
      }
      this.displayTable.push(obj);
    }

    console.log("table data", this.displayTable);

  }



  findProductById(data) {
    let obj = this.productDropDown.find(x => x['_id'] === data);
    let index = this.productDropDown.indexOf(obj);
    return this.productDropDown[index].product_name;
  }


  findGrowerById(data) {
    let obj = this.growerDropDown.find(x => x['_id'] === data);
    let index = this.growerDropDown.indexOf(obj);
    return this.growerDropDown[index]['first_name'];
  }

}
