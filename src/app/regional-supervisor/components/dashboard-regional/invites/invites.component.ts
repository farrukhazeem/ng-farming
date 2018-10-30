import { log } from 'util';
import { InvitesService } from './../../../../providers/invites.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from "@angular/forms";
import { GrowerService } from 'src/app/providers/grower.service';
import { DistrictService } from 'src/app/providers/district.service';
import { FieldsService } from 'src/app/providers/fields.service';
import { ProductsService } from 'src/app/providers/products.service';
import { ContractService } from '../../../../providers/contract.service';
import { CreateUserService } from '../../../../providers/create-user.service';
import { Observable } from 'rxjs';
// import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

declare let $;
@Component({
	selector: 'app-invites',
	templateUrl: './invites.component.html',
	styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {
	demoArray = [
		{ growerName: 'Jake Jake', inviteNumber: '12312312', creationDate: '11/11/2011', go: 'Go' },
	];
	invites_rootForm: FormGroup;
	invitesForm: FormGroup;
	generalForm: FormGroup;

	fieldsDropDown = [{ "region_name": "" }];
	growersDropDown = [{ "farm_name": "" }];
	productsDropDown = [{ "product_name": "" }];
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
	loginUser;
	inviteRecordTable = [];
	growerfieldsDropDown = [];

	constructor(private fb: FormBuilder, private gs: GrowerService, private ds: DistrictService, private fieldService: FieldsService, private productService: ProductsService, private is: InvitesService, private cs: ContractService, private cus: CreateUserService, private toastr: ToastrService) {
		this.createForm();
		// this.apiCall();
		this.loginUserApi()
	}

	ngOnInit() {
		// this.spinner.show();
		// this.spinner.show();
	}
	createForm() {
		this.invites_rootForm = this.fb.group({
			selectGrower: ['', Validators.required],
			id: [null, Validators.required],
		});
		this.invitesForm = this.fb.group({
			invite_id: [null],
			grower_id: [null],
			product_id: [null],
			field_id: [null],
			requested_quantity: ['', Validators.required],
			approved_quantity: ['', Validators.required],
			supply_date: ['', Validators.required],
			status: ['waiting for regional supervisor', Validators.required],
			size: ['', Validators.required],
		});
		this.generalForm = this.fb.group({
			generalNotes: ['', Validators.required],
		});

	}


	loginUserApi() {
		this.cus.getLoginUserData()
			.subscribe(data => {
				console.log(data);
				this.loginUser = data['users'][0];
				console.log(this.loginUser);
			}, (error) => {
				console.log(error);
			}, () => {
				// this.getSupervisors();
				this.apiCall();
			})

	}

	tableData() {


		let body = {
			invite_id: "",
			grower_id: this.invites_rootForm.value.id,
			product_name: this.findProductById(this.invitesForm.value.product_id),
			field_name: this.findFieldById(this.fieldId),
			product_id: this.invitesForm.value.product_id,
			field_id: this.fieldId,
			requested_quantity: this.invitesForm.value.requested_quantity,
			approved_quantity: this.invitesForm.value.approved_quantity,
			supply_date: this.invitesForm.value.supply_date,
			status: 'waiting for regional supervisor',
			size: this.invitesForm.value.size,
		}
		console.log(body);

		this.displayTempInvitesTable.push(body);
		// this.inviteRecordTable.push(body);
		this.invitesForm.reset();
		this.toastr.success('Add Invite!', 'Completes!');
	}

	apiCall() {
		console.log('getGrowerData');

		this.gs.getGrowerByRegionId(this.loginUser['district']).subscribe((data) => {
			this.growersDropDown = [...this.growersDropDown, ...data['data']];
		}, (error) => {
		}, () => {
			this.getFieldsApi()
		});

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
			// this.showTableData();
			this.userApi();
		});

	}



	tableUserData = []
	userApi() {
		this.cus.getSuperVisorUser2("supervisor")
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





	// filterGrowerData = [];
	filterGrowers() {
		// console.log('Filter Grower');

		// for (let i = 0; i < this.tableUserData.length; ++i) {
		// 	for (let j = 0; j < this.growersDropDown.length; ++j) {
		// 		if (this.tableUserData[i]['user_id'] == this.growersDropDown[j]['supervisor_id']) {
		// 			this.filterGrowerData.push(this.growersDropDown[j]);
		// 		}
		// 	}
		// }
		// console.log(this.filterGrowerData);
		// this.filterContract();
		// this.filterFields();
		//   this.showTableData()
		// this.filterInvites();

		this.getInvitesApi();
	}

	allInvitesData = [];
	getInvitesApi() {
		this.is.getInvitesData().subscribe(data => {
			this.allInvitesData = [...this.allInvitesData, ...data['data']];
		}, (error) => {

		}, () => {
			this.filterInvites();
		})
	}


	filterInvitesData = [];
	filterInvites() {
		console.log(this.growersDropDown);

		for (let i = 0; i < this.allInvitesData.length; ++i) {
			for (let j = 0; j < this.growersDropDown.length; ++j) {
				if (this.allInvitesData[i]['grower_id'] == this.growersDropDown[j]['_id']) {
					this.allInvitesData[i]['grower_id'] = this.findGrowerById(this.allInvitesData[i]['grower_id'])
					this.filterInvitesData.push(this.allInvitesData[i]);
				}
			}
		}
		console.log(this.filterInvitesData);
		// this.createShowTable();
	}


	getProductsApi() {
		console.log('getProductsApi');
		this.productService.getProductsData().subscribe((data) => {
			this.productsDropDown = [...this.productsDropDown, ...data['data']];
			console.log(this.productsDropDown);
		}, (error) => {
			console.log(error);
		}, () => {
			this.getInvitesDeatilApi();
			this.dateConstrain();
		})
	}

	getInvitesDeatilApi() {
		console.log('getInvitesDeatilApi');
		this.invitesData = [];
		this.is.getInvitesDetails().subscribe((data) => {
			
			this.invitesData = data['data'];

			console.log(data);
		}, (error) => {
			console.log(error);
		}, () => {
			// this.createShowTable();
			this.filterInvites();
			this.showLoader = false;
		})
	}

	growerID;
	growerContracts;
	onChange(value) {
		
		this.growerID = value;
		this.invites_rootForm.patchValue({
			id: this.growersDropDown[value]['_id']
		})
		// this.allTabData(this.growersDropDown[value]['_id'])
		this.fieldService.getFieldById(this.growersDropDown[value]['_id']).subscribe((data) => {
			this.growerfieldsDropDown = [...this.growerfieldsDropDown, ...data['data']];
		}, (error) => {
			console.log(error);
		})

		this.cs.getContractByGrowerId(this.growersDropDown[value]['_id']).subscribe(data => {
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

	showProductDropDown = [];
	showProducts() {
		console.log('show products ==== >');
		this.showProductDropDown = [];
		// this.showProductDropDown =  this.productsDropDown.filter(data => data['product_id'] == )
		for (let i = 0; i < this.growerContracts.length; ++i) {
			this.showProductDropDown.push(this.productsDropDown.find(data => data['_id'] == this.growerContracts[i]['product_id']))
		}
	}

	allTabData(id) {
		console.log("allTabData", id)

		this.is.getInvitesDataById(id).subscribe(data => {

			this.allTabTableData = data['data'];
			for (let i = 0; i < this.allTabTableData.length; ++i) {
				this.allTabTableData[i]['grower_id'] = this.findGrowerById(this.allTabTableData[i]['grower_id'])
			}


		}, (error) => {
			console.log(error);
		})
	}

	onFieldChange(value) {

		this.fieldId = this.growerfieldsDropDown[value]['_id'];
		console.log(this.fieldId);

		this.invitesForm.patchValue({
			size: this.growerfieldsDropDown[value]['field_size']
		})


		this.calculateAmountLeft(this.growerfieldsDropDown[value]['field_size']);
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
				console.log(amountUsed);
			}
		}

		let sameFields2 =  this.displayTempInvitesTable.filter(data => ((data['supply_date'] > currentContract.start_date) && (data['supply_date'] < currentContract.end_date)));
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
		let amount_left = amount_for_field - amountUsed;


		console.log(amount_left);

		this.invitesForm.patchValue({
			approved_quantity: amount_left
		})

	}



	productObj;
	onProdChange(value) {
		this.productObj = this.productsDropDown.find(x => x['_id'] === value)
		this.invitesForm.patchValue({
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
		for (let i = 0; i < this.filterInvitesData.length; ++i) {
			let obj = {
				supply_date: this.filterInvitesData[i].supply_date,
				field_name: this.findFieldById(this.filterInvitesData[i]['field_id']),
				size: this.filterInvitesData[i].size,
				product: this.findProductById(this.filterInvitesData[i]['product_id']),
				amount: this.filterInvitesData[i].requested_quantity,
			}
			this.displayInvitesTable.push(obj);
			if (i >= this.filterInvitesData.length - 1) {
				// this.showLoader = false;
			}
		}
	}

	// updateDisplayData(data) {
	// 	console.log('updateDisplayData');
	// 	let obj = {
	// 		supply_date: data.supply_date,
	// 		field_name: this.findFieldById(data.field_id),
	// 		size: data.size,
	// 		product: this.findProductById(data.product_id),
	// 		amount: data.requested_quantity,
	// 	}
	// 	this.displayInvitesTable.push(obj);
	// }





	findProductById(data) {
		let obj = this.productsDropDown.find(x => x['_id'] === data);
		let index = this.productsDropDown.indexOf(obj);
		return this.productsDropDown[index].product_name;
	}


	findFieldById(data) {
		let obj = this.fieldsDropDown.find(x => x['_id'] === data);
		let index = this.fieldsDropDown.indexOf(obj);
		return this.fieldsDropDown[index]['field_name'];
	}


	findGrowerById(data) {
		console.log(this.growersDropDown);
		console.log(data);
		console.log(this.allTabTableData);



		let obj = this.growersDropDown.find(x => x['_id'] === data);
		let index = this.growersDropDown.indexOf(obj);
		return this.growersDropDown[index]['first_name'];
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
			data['data']['grower_id'] = this.findGrowerById(data['data']['grower_id']);
			this.filterInvitesData = [...this.filterInvitesData, ...data['data']]
			// this.showTableData()
			this.inviteId = data['data']['_id'];

		}, (error) => {
			console.log(error);

		}, () => {
			this.pushInvitesDetails();
			this.invitesForm.reset();
			this.toastr.success('Add Invite!', 'Completes!');
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

				// data['data']['grower_id'] = this.findGrowerById(this.allInvitesData[i]['grower_id'])
				// this.filterInvitesData.push(data['data']);

				// this.updateDisplayData(data['data'])
			}, (error) => {
				console.log(error);
			}, () => {
				// this.invitesForm.patchValue({
				// 	product_id: this.productOldvalue,
				// 	field_id: this.fieldOldvalue,
				// })
				// i++;

			})
			if (i >= this.displayTempInvitesTable.length - 1) {
				// this.showLoader = false;
				this.displayTempInvitesTable = [];
				// this.getInvitesDeatilApi();
			}
		}
		// }

	}




	showTableData() {
		this.is.getInvitesData().subscribe(data => {
			this.allTabTableData = data['data'];
			for (let i = 0; i < this.allTabTableData.length; ++i) {
				this.allTabTableData[i]['grower_id'] = this.findGrowerById(this.allTabTableData[i]['grower_id'])
			}
		}, (error) => {
			console.log(error);
		})
	}


	dateConstrain() {
		let todayDate = this.formatDate();
		// this.productsDropDown.filter(data => data['end_date'] < todayDate)
		for (let i = 0; i < this.productsDropDown.length; ++i) {
			if (this.productsDropDown[i]['end_date'] < todayDate) {
				console.log(this.productsDropDown[i]);

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

		}, () => {
			console.log(this.invitesData);
			let delIndex = this.invitesData.indexOf(data);
			this.invitesData.splice(delIndex, 1);
			this.modelData.splice(index, 1);
			console.log(this.invitesData);
			this.toastr.success('Delete Invite!', 'Completes!');
		})
	}

	deleteCompleteInvite() {
		
		this.is.removeCompleteInvite(this.deleteIviteData['_id']).subscribe(res => {
			console.log(res);
		}, (error) => {
			console.log(error);
		}, () => {
			let delIndex = this.filterInvitesData.indexOf(this.deleteIviteData);
			this.filterInvitesData.splice(delIndex, 1);
			this.toastr.success('Delete Invite!', 'Completes!');
		})

		console.log(this.filterInvitesData);

	}


}

