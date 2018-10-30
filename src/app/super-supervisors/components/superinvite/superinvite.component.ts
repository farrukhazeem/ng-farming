
import { filter } from 'rxjs/operators';
  
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from "@angular/forms";

import { GrowerService } from 'src/app/providers/grower.service';
import { DistrictService } from 'src/app/providers/district.service';
import { FieldsService } from 'src/app/providers/fields.service';
import { ProductsService } from 'src/app/providers/products.service';
  
import { Observable } from 'rxjs';
  
import { ToastrService } from 'ngx-toastr';
import { InvitesService } from 'src/app/providers/invites.service';
import { ContractService } from 'src/app/providers/contract.service';

import { CreateUserService } from 'src/app/providers/create-user.service';


declare let $;

@Component({
  selector: 'app-superinvite',
  templateUrl: './superinvite.component.html',
  styleUrls: ['./superinvite.component.css']
})
export class SuperinviteComponent implements OnInit {
 
  invites_rootForm: FormGroup;
  // invitesForm: FormGroup;
  
  fieldsDropDown = [{ "region_name": "" }];
  
  growersDropDown = [{ "farm_name": "" }];
  
  supervisorDropDown = [];

  Allproducts = [{ "product_name": "" }];
  
  regionDropDown=[];

   supervisorselected: string;

  firstName;

	fieldId;
	productId;
	inviteId;
	productOldvalue;
	fieldOldvalue;
	invitesData;
	displayTempInvitesTable = [];
	displayInvitesTable;
	showLoader = true;
	allTabTableData = [];
  fieldsData = [];
  selectedSupervisor = []
  selectedGrower = []
  
  constructor(private fb: FormBuilder, private gs: GrowerService,
     private ds: DistrictService, private fieldService: FieldsService, 
     private productService: ProductsService, private is: InvitesService,
     private cs: ContractService, 
    private cus: CreateUserService, private toastr: ToastrService) {
      this.createForm();
      this.apiCall();
      this.apisupCall();
     }

  ngOnInit() {
  }


  createForm() {
		this.invites_rootForm = this.fb.group({
			selectGrower: ['Grower', Validators.required],
      id: [null, Validators.required],
      to_date: [null, Validators.required],
      from_date: [null, Validators.required],
      selectSupervisor:[null, Validators.required]
		});
		// this.invitesForm = this.fb.group({
    //   user_id: [null],
		// 	invite_id: [null],
		// 	grower_id: [null],
		// 	product_id: [null],
		
		// 	requested_quantity: ['', Validators.required],
		// 	approved_quantity: ['', Validators.required],
		// 	supply_date: ['', Validators.required],
		// 	status: ['waiting for regional supervisor', Validators.required],
		// });
	

  }   

	apiCall() {
		console.log('getGrowerData');
		this.gs.getGrowerData().subscribe((data) => {
			this.growersDropDown = [...this.growersDropDown, ...data['data']];
			console.log(this.growersDropDown);
		}, (error) => {
			console.log(error);
		}, () => {
      this.getFieldsApi();
      this.userApi();
      // this.concatfun();

		})
}


apisupCall() {
  console.log('getSupervisorData');
 
   this.cus.getSuperVisorUser("supervisor")
   .then((data: Observable<any>) => {
     data.subscribe(data => {
       this.supervisorselected= data;

       console.log(this.supervisorselected);

      //  this.tableUserData = data['users'];

      this.supervisorDropDown = [...this.supervisorDropDown, ...data.users];
       console.log(this.supervisorDropDown);

     })
   }, (error) => {
     console.log(error)
   })

  
}



getFieldsApi() {
  console.log('getFieldsApi');
  this.fieldService.getFieldsData().subscribe((data) => {
    this.fieldsDropDown = [...this.fieldsDropDown, ...data['data']];
     console.log(this.fieldsDropDown);
  }, (error) => {
    console.log(error);
  }, () => {
    this.getProductsApi();
    // this.showTableData(); ---------------
  });

}


getProductsApi() {
  console.log('getProductsApi');
  this.productService.getProductsData().subscribe((data) => {
    this.Allproducts = [...this.Allproducts, ...data['data']];
     console.log(this.Allproducts);
  }, (error) => {
    console.log(error);
  }, () => {
    this.getInvitesDeatilApi();
    this.dateConstrain();
  })
}

getInvitesDeatilApi() {
  //console.log('getInvitesDeatilApi');
  this.is.getInvitesDetails().subscribe((data) => {
    this.invitesData = data['data'];

    // console.log(data);
  }, (error) => {
    console.log(error);
  }, () => {
    this.createShowTable();
    this.showLoader = false;
  })
}

growerID;
growerContracts;
growerfieldsDropDown = [];

supervisorID;



// concatfun(){
//   let concatarray= [...this.supervisorDropDown,...this.growersDropDown];
//   console.log(concatarray);
// }


onChange(event) {
 
  let value = event.target.value;
  let filterGrowers = this.growersDropDown.filter(d => value === d["_id"]);
  this.selectedGrower = filterGrowers;
  this.growerID = value;
  this.invites_rootForm.patchValue({
    id: value
  })
  this.allTabData(value)

  this.fieldService.getFieldById(value).subscribe((data) => {
    console.log('on change event of GROWER')
    console.log(data);
    this.growerfieldsDropDown = [...this.growerfieldsDropDown, ...data['data']];
  }, (error) => {
    console.log(error);
  })

  this.cs.getContractByGrowerId(value).subscribe(data => {
    console.log("Grower Contracts", data);
    this.growerContracts = data['data'];
  }, (error) => {
    console.log(error);
  }, () => {
    this.validateContract();
  })

}

onChangeSupervisor(event) {
  let value = event.target.value;
  let filteredSupervisor = this.supervisorDropDown.filter(d => d._id === value);
  this.selectedSupervisor = filteredSupervisor

  this.supervisorID = value;
  this.invites_rootForm.patchValue({
    id: value
  })
  this.allTabData(value)

  this.fieldService.getFieldById(this.growerID).subscribe((data) => {
    console.log('on change event of Supervisor')
    console.log(data);
    this.supervisorDropDown = [...this.supervisorDropDown, ...data['data']];
  }, (error) => {
    console.log(error);
  })

  this.cs.getContractByGrowerId(this.growerID).subscribe(data => {
    console.log("Grower Contracts", data);
    this.growerContracts = data['data'];
  }, (error) => {
    console.log(error);
  }, () => {
    this.validateContract();
  })
}


validateContract() {
  let todayDate = this.formatDate();
  let contracts = this.growerContracts;
  this.growerContracts = [];
  this.growerContracts = contracts.filter(data => (data['end_date'] >= todayDate));
  this.showProducts();
}

showProductData = [];
showProducts() {
  console.log('show products ==== >');
  this.showProductData = [];
  // this.showProductDropDown =  this.productsDropDown.filter(data => data['product_id'] == )
  for (let i = 0; i < this.growerContracts.length; ++i) {
    this.showProductData.push(this.Allproducts.find(data => data['_id'] == this.growerContracts[i]['product_id']))
  }
}

allTabData(id) {
  console.log("allTabData", id)

  this.is.getInvitesDataById(id).subscribe(data => {
    this.allTabTableData = data['data'];
    for (let i = 0; i < this.allTabTableData.length; ++i) {
      this.allTabTableData[i]['grower_id'] = this.findGrowerById(this.allTabTableData[i]['grower_id'])
      this.allTabTableData[i]['product_name'] = this.findProductById(this.allTabTableData[i]['product_id'])
      this.allTabTableData[i]['supervisor_name'] = this.findSupervisorById()
      
    }

  }, (error) => {
    console.log(error);
  })
}

onFieldChange(value) {

  this.fieldId = this.growerfieldsDropDown[value]['_id'];
  console.log(this.fieldId);

  this.invites_rootForm.patchValue({
    size: this.growerfieldsDropDown[value]['field_size']
  })


  this.calculateAmountLeft(this.growerfieldsDropDown[value]['field_size']);
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
  console.log(this.tableUserData);

  for (let i = 0; i < this.tableUserData.length; ++i) {
    for (let j = 0; j < this.growersDropDown.length; ++j) {
      if (this.tableUserData[i]['user_id'] == this.growersDropDown[j]['supervisor_id']) {
        this.filterGrowerData.push(this.growersDropDown[j]);
      }
    }
  }
  console.log(this.filterGrowerData);

  this.showTableData();
}

// Filter Supervisor

filterSupervisorData = [];

filterSupervisor() {
  console.log('Filter Supervisor');

  console.log(this.tableUserData);

  for (let i = 0; i < this.tableUserData.length; ++i) {
    for (let j = 0; j < this.supervisorDropDown.length; ++j) {
      if (this.tableUserData[i]['user_id'] == this.supervisorDropDown[j]['supervisor_id']) {
        this.filterSupervisorData.push(this.supervisorDropDown[j]);
      }
    }
  }
  console.log(this.filterSupervisorData);

  this.showTableData();
}

fields_sum = 0;
calculateAmountLeft(selectedFieldSize) {
  this.fields_sum = 0;
  //5) amount_used = get all invite details between contract start_date and end_date for the selected field
  //6) amount_left = amount for field - amount used

  console.log(this.growerfieldsDropDown);
  for (let i = 0; i < this.growerfieldsDropDown.length; ++i) {
    this.fields_sum = this.fields_sum + Number(this.growerfieldsDropDown[i]['field_size']);
    //  console.log(this.fields_sum);
  }

  console.log(this.fields_sum);
  console.log(selectedFieldSize);

  let currentContract = this.growerContracts.find(x => x['product_id'] === this.productObj['_id'])
  console.log(currentContract);

  let contract_size = currentContract['amount'];
  console.log(contract_size);

  // this.productsDropDown.find(data => data['_id'] == this.growerContracts[i]['product_id'])

  console.log(currentContract.start_date);
  console.log(currentContract.end_date);
  console.log(this.fieldId);

  console.log(this.invitesData);


  let fields = this.invitesData.filter(data => data['field_id'] === this.fieldId)
  console.log(fields);

  let amountUsed: number = 0;
  let sameFields = fields.filter(data => ((data['supply_date'] > currentContract.start_date) && (data['supply_date'] < currentContract.end_date)));
  console.log(sameFields);

  for (let i = 0; i < sameFields.length; ++i) {
    if (sameFields[i]['product_id'] == currentContract['product_id']) {
      amountUsed += Number(sameFields[i]['requested_quantity']);
      console.log(sameFields[i]);
      console.log(amountUsed);
    }
  }

  let sameFields2 = this.displayTempInvitesTable.filter(data => ((data['supply_date'] > currentContract.start_date) && (data['supply_date'] < currentContract.end_date)));
  console.log(sameFields2);
  for (let i = 0; i < sameFields2.length; ++i) {
    if (sameFields2[i]['product_id'] == currentContract['product_id']) {
      amountUsed += Number(sameFields2[i]['requested_quantity']);
      console.log(amountUsed);
    }
  }


  console.log(amountUsed);
  console.log(Number(amountUsed));


  let amount_for_field = (Number(contract_size) / Number(this.fields_sum)) * Number(selectedFieldSize);
  console.log(amount_for_field);

  let amount_left = amount_for_field - amountUsed;


  console.log(amount_left);

  this.invites_rootForm .patchValue({
    approved_quantity: amount_left
  })

}




productObj;
onProdChange(value) {
  this.productObj = this.Allproducts.find(x => x['_id'] === value)
  this.invites_rootForm .patchValue({
    requested_quantity: '0'
  })
}


deleteTempData(index) {
  this.displayTempInvitesTable.splice(index, 1);
  this.toastr.success('Delete Invite!', 'Completes!');
}


createShowTable() {
  console.log('createShowTable');
  this.displayInvitesTable = [];
  for (let i = 0; i < this.invitesData.length; ++i) {
    let obj = {
      supply_date: this.invitesData[i].supply_date,
      field_name: this.findFieldById(this.invitesData[i]['field_id']),
      size: this.invitesData[i].size,
      product: this.findProductById(this.invitesData[i]['product_id']),
      amount: this.invitesData[i].requested_quantity,
    }
    this.displayInvitesTable.push(obj);
    if (i >= this.invitesData.length - 1) {
      // this.showLoader = false;
    }
  }
}

findProductById(data) {
  let obj = this.Allproducts.find(x => x['_id'] === data);
  let index = this.Allproducts.indexOf(obj);
  return this.Allproducts[index].product_name;
}


findFieldById(data) {
  let obj = this.fieldsDropDown.find(x => x['_id'] === data);
  let index = this.fieldsDropDown.indexOf(obj);
  return this.fieldsDropDown[index]['field_name'];
}


findGrowerById(data) {
  let obj = this.filterGrowerData.find(x => x['_id'] === data);
  let index = this.filterGrowerData.indexOf(obj);
  return this.filterGrowerData[index]['first_name'];
}

findSupervisorById() {
  let foundSupervisor = this.supervisorDropDown.find(supervisor => supervisor._id == this.supervisorID);
  return foundSupervisor.first_name;
}

createInvite() {
  
      let user_data1 = localStorage.getItem('user_data')
      let user_data = JSON.parse((user_data1));
      let uid = user_data.sub;
  
      let d = new Date();
      let nDate = this.formatDate();
  
      let body = {
        grower_id: this.invites_rootForm.value.id,
        supervisor_creator: uid,
        status: 'waiting for regional supervisor',
        open_date: nDate,
      }
  
  
      this.is.addInvites(body).subscribe((data) => {
        console.log(data);
  
        this.allTabTableData = [...this.allTabTableData, ...data['data']]
        this.showTableData()
        this.inviteId = data['data']['_id'];
      }, (error) => {
        console.log(error);
        this.toastr.error('Add Invite!', 'Error!');
  
      }, () => {
        this.pushInvitesDetails();
        this.invites_rootForm .reset();
        // this.productOldvalue = this.invitesForm.value.product_id;
        // this.fieldOldvalue = this.invitesForm.value.field_id;
  
        // this.invitesForm.patchValue({
        // 	product_id: this.productId,
        // 	field_id: this.fieldId,
        // 	grower_id: this.invites_rootForm.value.id,
        // 	invite_id: this.inviteId
        // })
        // console.log(this.invitesForm.value);
      })
    }
  
  
    pushInvitesDetails() {
      for (let i = 0; i < this.displayTempInvitesTable.length; ++i) {
        // let i = 0;
        // while (i < this.displayTempInvitesTable.length) {
        let body = {
          invite_id: this.inviteId,
          grower_id: this.invites_rootForm.value.id,
          // product_name: this.findProductById(this.invitesForm.value.product_id),
          // field_name: this.findFieldById(this.fieldId),
          product_id: this.displayTempInvitesTable[i].product_id,
          field_id: this.displayTempInvitesTable[i].field_id,
          requested_quantity: this.displayTempInvitesTable[i].requested_quantity,
          approved_quantity: this.displayTempInvitesTable[i].approved_quantity,
          supply_date: this.displayTempInvitesTable[i].supply_date,
          status: 'waiting for regional supervisor',
          size: this.displayTempInvitesTable[i].size,
        }
  
        this.is.addInvitesDetails(body).subscribe((data) => {
          console.log(data);
          this.invitesData = [...this.invitesData, ...data['data']];
          // this.updateDisplayData(data['data'])
        }, (error) => {
          console.log(error);
        }, () => {
          // this.invitesForm.patchValue({
          // 	product_id: this.productOldvalue,
          // 	field_id: this.fieldOldvalue,
          // })
          this.toastr.success('Add Invite!', 'Completes!');
          i++;
  
        })
        if (i >= this.displayTempInvitesTable.length - 1) {
          // this.showLoader = false;
          this.displayTempInvitesTable = [];
        }
      }
      // }
  
    }


    filterAllTabTableData = [];
    showTableData() {
      this.filterAllTabTableData = [];
      console.log(">>>>>>>>>>>>>>>>>>");
  
      this.is.getInvitesData().subscribe(data => {
        this.allTabTableData = data['data'];
        
        console.log(this.allTabTableData);
  
        for (let i = 0; i < this.allTabTableData.length; ++i) {
          for (let j = 0; j < this.filterGrowerData.length; ++j) {
            if (this.allTabTableData[i]['grower_id'] == this.filterGrowerData[j]['_id']) {
              this.filterAllTabTableData.push(this.allTabTableData[i]);
            }
          }
        }
        console.log(this.filterAllTabTableData);
  
  
        for (let i = 0; i < this.filterAllTabTableData.length; ++i) {
          this.filterAllTabTableData[i]['grower_id'] = this.findGrowerById(this.filterAllTabTableData[i]['grower_id'])
        }
        // console.log(data['data']);
  
      }, (error) => {
        console.log(error);
      })
    }
  
  
    dateConstrain() {
      let todayDate = this.formatDate();
      // this.productsDropDown.filter(data => data['end_date'] < todayDate)
      for (let i = 0; i < this.Allproducts.length; ++i) {
        if (this.Allproducts[i]['end_date'] < todayDate) {
          console.log(this.Allproducts[i]);
  
        }
      }
    }
  
  
    formatDate() {
      var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
  
      return [year, month, day].join('-');
    }
  
  
    modelData = [];
    deleteIviteData;
    showDetailData(row, index) {
      console.log(row);
      this.deleteIviteData = row;
      console.log(index);
      let a;
      this.modelData = this.invitesData.filter(data => data['invite_id'] == row['_id'])
      for (let i = 0; i < this.modelData.length; ++i) {
        this.modelData[i]['growerName'] = row['grower_id'];
        this.modelData[i]['product_name'] = this.findProductById(this.modelData[i]['product_id']);
        this.modelData[i]['field_name'] = this.findFieldById(this.modelData[i]['field_id'])
      }
      console.log(this.modelData);
  
    }
  
    removeModelData(data, index) {
      console.log(data);
      console.log(index);
  
  
      this.is.removeInviteDetailById(data['_id']).subscribe(res => {
        console.log(res);
      }, (error) => {
        console.log(error);
        this.toastr.error('Delete Invite!', 'Completes!');
  
      }, () => {
        console.log(this.invitesData);
        let delIndex = this.invitesData.indexOf(data);
        this.invitesData.splice(delIndex, 1);
        this.modelData.splice(index, 1);
        console.log(this.invitesData);
        this.toastr.success('Remove Invite!', 'Completes!');
  
      })
    }
  
    deleteCompleteInvite() {
  
      this.is.removeCompleteInvite(this.deleteIviteData['_id']).subscribe(res => {
        console.log(res);
      }, (error) => {
        console.log(error);
        this.toastr.error('Delete Invite!', 'Completes!');
  
      }, () => {
        let delIndex = this.filterAllTabTableData.indexOf(this.deleteIviteData);
        this.filterAllTabTableData.splice(delIndex, 1);
        this.toastr.success('Delete Invite!', 'Completes!');
      })
  
  
      console.log(this.filterAllTabTableData);
  
    }

}
