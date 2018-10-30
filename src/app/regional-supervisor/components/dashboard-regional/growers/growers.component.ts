import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from "@angular/forms";
import { DistrictService } from '../../../../providers/district.service';
import { CreateUserService } from '../../../../providers/create-user.service';
import { log } from 'util';
import { GrowerService } from '../../../../providers/grower.service';
import { ContractService } from '../../../../providers/contract.service';
import { ProductsService } from '../../../../providers/products.service';
import { FieldsService } from '../../../../providers/fields.service';
import { InvitesService } from '../../../../providers/invites.service';
import { Observable } from 'rxjs';
import { ReportsService } from '../../../../providers/reports.service';
import { BugService } from '../../../../providers/bug.service';

declare let $;

@Component({
	selector: 'app-growers',
	templateUrl: './growers.component.html',
	styleUrls: ['./growers.component.css']
})
export class GrowersComponent implements OnInit {
	demoArray = [
		{ firstName: 'cell 1', lastName: 'cell 2', email: 'cell 3', phone: 'cell 3', go: 'Go' },
		{ firstName: 'cell 1', lastName: 'cell 2', email: 'cell 3', phone: 'cell 3', go: 'Go' },
		{ firstName: 'cell 1', lastName: 'cell 2', email: 'cell 6', phone: 'cell 3', go: 'Go' }

	];
	growersForm_selected: FormGroup;
	growersForm_all: FormGroup;
	edit_growersForm: FormGroup;
	add_growersForm: FormGroup;
	growerTable;
	contractNewArray = [];
	fieldsData = [];
	invitesData = [];
	selectedCountry;
	districtData = [{ "region_name": "" }];
	tableUserData = [{ "firstName": "" }];
	contracts = [];
	productData = [];
	displayFieldData = [];
	displayContractData = [];
	displayinviteData = [];
	tableUserDataFilter = [];
	tableUserData2 = [];
	superSupervisorUserId = [];
	growerShowTable = [];
	bugsData = [];

	loginUser;
	constructor(private fb: FormBuilder, private districtService: DistrictService, private cus: CreateUserService, private gs: GrowerService, private cs: ContractService, private ps: ProductsService, private fs: FieldsService, private is: InvitesService, private rs: ReportsService, private bugService: BugService) { }


	ngOnInit() {
		this.createForm();
		this.apiCalling();
	}
	createForm() {
		this.growersForm_selected = this.fb.group({
			firstName: [null, Validators.required],
			lastName: [null, Validators.required],
			district: [null, Validators.required],
			email: [null, Validators.required],
			id: [null, Validators.required],
			mobile: [null, Validators.required],
			phone: [null, Validators.required]
		});

		this.growersForm_all = this.fb.group({
			first_name: [null, Validators.required],
			last_name: [null, Validators.required],
			cell_phone: [null, Validators.required],
			email: [null, Validators.required],
			zip_code: ['ab-ab-12', Validators.required],
			office_phone: [null, Validators.required],
			farm_name: [null, Validators.required],
			address: [null, Validators.required],
			eshkol_number: [null, Validators.required],
			region_id: [null, Validators.required],
			id: [null, Validators.required],
			supervisor_id: [null, Validators.required],

		});


		this.edit_growersForm = this.fb.group({
			first_name: [null, Validators.required],
			last_name: [null, Validators.required],
			cell_phone: [null, Validators.required],
			email: [null, Validators.required],
			zip_code: ['ab-ab-12', Validators.required],
			office_phone: [null, Validators.required],
			farm_name: [null, Validators.required],
			address: [null, Validators.required],
			eshkol_number: [null, Validators.required],
			region_id: [null, Validators.required],
			id: [null, Validators.required],
			supervisor_id: [null, Validators.required],

		});

		this.add_growersForm = this.fb.group({
			first_name: ["", Validators.required],
			last_name: ["", Validators.required],
			cell_phone: ["", Validators.required],
			email: ["", Validators.required],
			zip_code: ['ab-ab-12', Validators.required],
			office_phone: ["", Validators.required],
			farm_name: ["", Validators.required],
			address: ["", Validators.required],
			eshkol_number: ["", Validators.required],
			region_id: ["", Validators.required],
			supervisor_id: [null, Validators.required],

		});
	}

	apiCalling() {
		this.districtService.getDistrictData()
			.subscribe((data) => {
				console.log(data);
				this.districtData = [...this.districtData, ...data['data']];
			}
				, (error) => {
					console.log(error)
				})


		this.bugService.getBugData().subscribe((data) => {
			console.log('bugs data', data['data']);
			this.bugsData = data['data'];
		}, (error) => {
			console.log('error', error);
		})


		// this.cus.getSuperVisorUserForSuperSuperVisor()
		// 	.subscribe(data => {
		// 		this.tableUserData = [...this.tableUserData, ...data['users']];
		// 		console.log(this.tableUserData);
		// 	}, (error) => {
		// 		console.log(error)
		// 	})


		// this.cus.getSuperVisorUser("supervisor")
		// 	.then((data: Observable<any>) => {
		// 		data.subscribe(data => {
		// 			console.log(data);
		// 			this.tableUserData = data['users'];
		// 		})
		// 	}, (error) => {
		// 		console.log(error)
		// 	})

		this.cus.getLoginUserData()
			.subscribe(data => {
				console.log(data);
				this.loginUser = data['users'][0];
				console.log(this.loginUser);
			}, (error) => {
				console.log(error);
			}, () => {
				this.getSupervisors();

			})




		this.cs.getContract()
			.subscribe(data => {
				this.contracts = data['data'];
				console.log(this.contracts);
			}, (error) => {
				console.log(error)
			}, () => {

			})


		this.fs.getFieldsData().subscribe((data) => {
			console.log('data', data['data']);
			this.fieldsData = [...this.fieldsData, ...data['data']];;
		}, (error) => {
			console.log('error', error);
		})

		this.is.getInvitesData()
			.subscribe((data) => {
				console.log('invites', data['data']);
				this.invitesData = data['data'];
			}, (error) => {
				console.log('error', error);
			})

	}

	getSupervisors() {


		this.cus.getSupervisorForARegion(this.loginUser['district'])
			.subscribe(data => {
				console.log(data);
				this.tableUserData = data['users'];
				console.log(this.tableUserData);
				for (let i = 0; i < this.tableUserData.length; ++i) {
					this.tableUserData[i]['FirstName'] = this.tableUserData[i]['firstName']
				}
			}, (error) => {
				console.log(error);
			}, () => {
				this.GrowerApi();

			})

	}


	GrowerApi() {

		this.gs.getGrowerData()
			.subscribe(data => {
				this.growerTable = data['data'];
				console.log(this.growerTable);
			}, (error) => {
				console.log(error)
			}, () => {
				// this.callSupervisor();
				this.filterGrowers();
				this.productApi();
			})


	}

	// callSupervisor() {
	// 	this.cus.getSuperVisorUser2("supervisor")
	// 		.then((data: Observable<any>) => {
	// 			data.subscribe(data => {
	// 				console.log(data);
	// 				let users = data['users'];
	// 				for (let i = 0; i < users.length; ++i) {
	// 					this.tableUserData2.push(users[i]['user_id'])
	// 				}
	// 				this.superSupervisorUserId = this.removeDuplicateUsingFilter(this.tableUserData2)
	// 				console.log(this.superSupervisorUserId);
	// 				this.filterGrowers();

	// 			})
	// 		})

	// }



	removeDuplicateUsingFilter(arr) {
		let unique_array = arr.filter(function (elem, index, self) {
			return index == self.indexOf(elem);
		});
		return unique_array
	}

	filterGrowers() {
		this.growerShowTable = [];
		console.log(this.loginUser);
		for (let i = 0; i < this.growerTable.length; ++i) {
			if (this.growerTable[i]['region_id'] == this.loginUser['district']) {
				this.growerShowTable.push(this.growerTable[i])
			}
		}
		console.log(this.growerShowTable);
	}


	productApi() {
		this.ps.getProductsData()
			.subscribe(data => {
				this.productData = data['data'];
				console.log(this.productData);
			}, (error) => {
				console.log(error)
			}, () => {
				this.createShowTable();
			})
	}



	createNewGrowers() {
		console.log(this.add_growersForm.value);
		this.gs.addGrower(this.add_growersForm.value).subscribe((data) => {
			this.growerTable = [...this.growerTable, ...data['data']];
		}, (error) => {
			console.log(error)
		});
	}


	submitEditData() {
		console.log(this.edit_growersForm.value);
		this.gs.editGrower(this.edit_growersForm.value).subscribe((data) => {
			this.growerTable[this.editIndex] = data['data'];
		}, (error) => {
			console.log(error)
		});
	}

	editIndex
	editDataFromList(data, index) {

		console.log(data);
		this.editIndex = index;
		this.edit_growersForm.patchValue({
			first_name: data.first_name,
			last_name: data.last_name,
			cell_phone: data.cell_phone,
			email: data.email,
			zip_code: data.zip_code,
			office_phone: data.office_phone,
			farm_name: data.farm_name,
			address: data.address,
			eshkol_number: data.eshkol_number,
			region_id: data.region_id,
			id: data._id,
			supervisor_id: data.supervisor_id,
		});

	}


	findSupervisorById(data) {
		console.log(data);
		console.log(this.tableUserData);

		let obj = this.tableUserData.find(x => x['user_id'] == data);
		if (obj == undefined) {
			return "Not Found";
		}
		return obj['FirstName'];
	}

	assignDetails(data, index) {

		console.log(data);

		this.growersForm_all.patchValue({
			first_name: data.first_name,
			last_name: data.last_name,
			cell_phone: data.cell_phone,
			email: data.email,
			zip_code: data.zip_code,
			office_phone: data.office_phone,
			farm_name: data.farm_name,
			address: data.address,
			eshkol_number: data.eshkol_number,
			region_id: this.findDistrictById(data.region_id),
			id: data._id,
			supervisor_id: this.findSupervisorById(data.supervisor_id)

		});


		this.displayContractsTable(data.first_name);
		this.displayFieldsTable(data._id);
		this.displayInvitesTable(data._id);
		this.reportsApi(data._id);

	}


	findDistrictById(data) {
		let obj = this.districtData.find(x => x['_id'] === data);
		return obj.region_name;
	}



	createShowTable() {
		console.log('createShowTable');
		for (let i = 0; i < this.contracts.length; ++i) {
			let obj = {
				grower_id: this.findGrowerById(this.contracts[i].grower_id),
				product_id: this.findProductById(this.contracts[i].product_id),
				amount: this.contracts[i].amount,
				start_date: this.contracts[i].start_date,
				end_date: this.contracts[i].end_date,
			}
			this.contractNewArray.push(obj);
		}

		console.log("table data", this.contractNewArray);

	}



	findProductById(data) {
		let obj = this.productData.find(x => x['_id'] === data);
		let index = this.productData.indexOf(obj);
		return this.productData[index].product_name;
	}


	findGrowerById(data) {
		let obj = this.growerTable.find(x => x['_id'] === data);
		let index = this.growerTable.indexOf(obj);
		return this.growerTable[index]['first_name'];
	}

	displayContractsTable(name) {
		this.displayContractData = this.contractNewArray.filter(data => data.grower_id === name);
	}

	displayFieldsTable(id) {
		this.displayFieldData = this.fieldsData.filter(data => data.grower_id === id)
		for (let i = 0; i < this.displayFieldData.length; ++i) {
			// console.log(this.reports[i]);
			this.displayFieldData[i]['growerName'] = this.findGrowerById(this.displayFieldData[i].grower_id)
		}
	}

	displayInvitesTable(id) {
		this.displayinviteData = this.invitesData.filter(data => data.grower_id === id)
		for (let i = 0; i < this.displayinviteData.length; ++i) {
			// console.log(this.reports[i]);
			this.displayinviteData[i]['growerName'] = this.findGrowerById(this.displayinviteData[i].grower_id)
		}
	}

	onRegionChange(data) {
		console.log("------------>", data);
		console.log(this.tableUserData);

		this.tableUserDataFilter = this.tableUserData.filter((user: any) => user.district == data)
		console.log(this.tableUserDataFilter);
	}

	// findSupervisorById(data) {
	// 	console.log(data);

	// 	let obj = this.tableUserData.find(x => x['_id'] === data);
	// 	console.log(obj);

	// 	let index = this.tableUserData.indexOf(obj);
	// 	console.log(index);

	// 	return this.tableUserData[index]['firstName'];
	// }


	// findRegionById(data) {
	// 	console.log(data);

	// 	let obj = this.tableUserData.find(x => x['_id'] === data);
	// 	console.log(obj);

	// 	let index = this.tableUserData.indexOf(obj);
	// 	console.log(index);

	// 	return this.tableUserData[index]['firstName'];
	// }




	reportsOfGrower = [];
	modelData = [];
	InviteDetail = [];
	ReportsDetail = [];

	reportsApi(id) {
		this.rs.getReportsOfGrower(id).subscribe(data => {
			console.log(data['data']);

			this.reportsOfGrower = data['data'];
		}, (error) => {
			console.log(error);
		}, () => {
			console.log('completed');
			this.assignNameForGrowerData(id);

		})
	}

	findFieldById(data) {
		let obj = this.fieldsData.find(x => x['_id'] === data);
		let index = this.fieldsData.indexOf(obj);
		return this.fieldsData[index]['field_name'];
	}

	changeIdToBug(data) {
		let obj = this.bugsData.find(x => x['_id'] === data);
		let index = this.bugsData.indexOf(obj);
		return this.bugsData[index]['bug_name'];
	}

	getReportsDetails(id) {
		console.log("getReportsDetails", id);

		this.rs.getReportsDetailByReportId(id).subscribe(data => {
			console.log('getReportsDetailByGrowerId');
			this.ReportsDetail = data['data'];

			console.log(data);
		}, (error) => {
			console.log(error);
		}, () => {
			console.log('Complete');
			this.convertReportId();
		})
	};

	getInvitesDetails(id) {
		console.log("getInvitesDetails", id);
		this.is.getInvitesDetailsByInviteId(id).subscribe(data => {
			console.log('getInvitesDataById');
			console.log(data);
			this.InviteDetail = data['data'];
		}, (error) => {
			console.log(error);
		}, () => {
			console.log('Complete');
			this.convertInvitesId();
		})
	};

	convertInvitesId() {
		for (let i = 0; i < this.InviteDetail.length; ++i) {
			this.InviteDetail[i]['Product_Name'] = this.findProductById(this.InviteDetail[i]['product_id']);
			this.InviteDetail[i]['Field_Name'] = this.findFieldById(this.InviteDetail[i]['field_id']);
		}
		$('#invitesModal').modal('show')
	};


	convertReportId() {
		for (let i = 0; i < this.ReportsDetail.length; ++i) {
			this.ReportsDetail[i]['Bug_Name'] = this.changeIdToBug(this.ReportsDetail[i]['bug_id']);
			this.ReportsDetail[i]['Field_Name'] = this.findFieldById(this.ReportsDetail[i]['field_id']);
		}
		$('#reportsModal').modal('show')
	};

	assignNameForGrowerData(id) {
		for (let i = 0; i < this.reportsOfGrower.length; ++i) {
			this.reportsOfGrower[i]['GrowerName'] = this.findGrowerById(id)
		}
		console.log(this.reportsOfGrower);

	}

}


// filterGrowers() {
// 	this.growerShowTable = [];
// 	console.log(this.growerTable);

// 	console.log(this.loginUser);
// 	for (let i = 0; i < this.growerTable.length; ++i) {
// 		for (let j = 0; j < this.tableUserData.length; ++j) {
// 			if (this.growerTable[i]['supervisor_id'] == this.tableUserData[j]['user_id']) {
// 				this.growerShowTable.push(this.growerTable[i])
// 			}
// 		}
// 	}
// 	console.log(this.growerShowTable);
// }
