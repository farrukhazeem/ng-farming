import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GrowerService } from '../../../../providers/grower.service';
import { ProductsService } from '../../../../providers/products.service';
import { ContractService } from '../../../../providers/contract.service';
import { CreateUserService } from '../../../../providers/create-user.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  constructor(private fb: FormBuilder, private gs: GrowerService, private productService: ProductsService, private cs: ContractService, private cus: CreateUserService, private toastr: ToastrService) { }
  createContractForm: FormGroup;
  editContractForm: FormGroup;

  growerDropDown = [];
  productDropDown = [];
  contractData = [];
  displayTable = [];

  ngOnInit() {
    this.createForm();
    this.apiCall();
  }


  apiCall() {

    this.gs.getGrowerData().subscribe((data) => {
      this.growerDropDown = data['data'];
      console.log(this.growerDropDown);
    }, (error) => {
      console.log(error)
    }, () => {
      this.productApi();
      this.userApi();
    });


  }

  tableUserData = []
  userApi() {
    this.cus.getSuperVisorUser("supervisor")
      .then((data: Observable<any>) => {
        data.subscribe(data => {
          console.log("user data", data);
          this.tableUserData = data['users'];
          this.filterGrowers();
        })

      }, (error) => {
        console.log(error)
      })

  }

  filterGrowerData = [];
  filterGrowers() {
    console.log('Filter Grower');

    for (let i = 0; i < this.tableUserData.length; ++i) {
      for (let j = 0; j < this.growerDropDown.length; ++j) {
        if (this.tableUserData[i]['user_id'] == this.growerDropDown[j]['supervisor_id']) {
          this.filterGrowerData.push(this.growerDropDown[j]);
        }
      }
    }
    console.log(this.filterGrowerData);
    // this.filterContract();
  }


  filterContractData = [];
  filterContract() {
    for (let i = 0; i < this.contractData.length; ++i) {
      for (let j = 0; j < this.filterGrowerData.length; ++j) {
        if (this.contractData[i]['grower_id'] == this.filterGrowerData[j]['_id']) {
          this.filterContractData.push(this.contractData[i]);
        }
      }
    }

    console.log(this.filterContractData);
    this.createShowTable();
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

      this.filterContract();
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


    this.editContractForm = this.fb.group({
      id: ['', Validators.required],
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
      data['data']['grower_id'] = this.findGrowerById(data['data']['grower_id']);
      data['data']['product_id'] = this.findProductById(data['data']['product_id']);

      this.filterContractData = [...this.filterContractData, ...data['data']];
      this.displayTable = [...this.displayTable, ...data['data']]
      console.log(data);

    }, (error) => {
      console.log(error);
      this.toastr.error('Add Contract!', 'Error!');
      
    }, () => {
      // this.createShowTable();
      this.createContractForm.reset();
      this.toastr.success('Add Contract!', 'Completes!');
    })
  }

  editIndex;
  assignEditData(data, index) {
    this.editIndex = index;
    this.editContractForm.patchValue({
      id: this.contractData[index]['_id'],
      grower_id: data['grower_id'],
      product_id: data['product_id'],
      amount: data['amount'],
      start_date: data['start_date'],
      end_date: data['end_date'],
    })
    console.log(data);

  }

  submiteditData() {
    this.cs.editContract(this.editContractForm.value).subscribe(data => {
      console.log(data)
      this.updateTableData(data['data']);
    }, (error) => {
      console.log(error);
      this.toastr.error('Edit Contract!', 'Error!');

    }, () => {
      console.log('Completed');
      this.editContractForm.reset();
      this.toastr.success('Edit Contract!', 'Completes!');
    })
  }


  updateTableData(data) {

    this.displayTable[this.editIndex].grower_id = data.grower_id;
    this.displayTable[this.editIndex].product_id = data.product_id;
    this.displayTable[this.editIndex].grower_name = this.findGrowerById(data.grower_id);
    this.displayTable[this.editIndex].product_name = this.findProductById(data.product_id);
    this.displayTable[this.editIndex].amount = data.amount;
    this.displayTable[this.editIndex].start_date = data.start_date;
    this.displayTable[this.editIndex].end_date = data.end_date;


  }

  createShowTable() {
    this.displayTable = [];
    console.log('createShowTable');
    for (let i = 0; i < this.filterContractData.length; ++i) {
      let obj = {
        grower_id: this.filterContractData[i].grower_id,
        product_id: this.filterContractData[i].product_id,
        grower_name: this.findGrowerById(this.filterContractData[i].grower_id),
        product_name: this.findProductById(this.filterContractData[i].product_id),
        amount: this.filterContractData[i].amount,
        start_date: this.filterContractData[i].start_date,
        end_date: this.filterContractData[i].end_date,
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
    let obj = this.filterGrowerData.find(x => x['_id'] === data);
    let index = this.filterGrowerData.indexOf(obj);
    return this.filterGrowerData[index]['first_name'];
  }

}
