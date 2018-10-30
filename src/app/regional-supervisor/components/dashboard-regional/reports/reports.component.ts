import { FieldsService } from './../../../../providers/fields.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from "@angular/forms";
import { GrowerService } from '../../../../providers/grower.service';
import { ReportsService } from '../../../../providers/reports.service';
import { DistrictService } from '../../../../providers/district.service';
import { BugService } from 'src/app/providers/bug.service';
import { CreateUserService } from '../../../../providers/create-user.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

declare let $;
@Component({
	selector: 'app-reports',
	templateUrl: './reports.component.html',
	styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
	demoArray = [
		{ growerName: 'Jake Jake', reportNumber: '12312312', creationDate: '11/11/2011', go: 'Go' },
	];

	reoprtsForm: FormGroup;
	reportsForm_add: FormGroup;
	generalForm: FormGroup;
	growersDropDown = [{ "farm_name": "" }];
	fieldsDropDown = [{ "region_name": "" }];
	fieldId;
	reportId;
	reportsData;
	displayData;
	displayTempData = [];
	reportsByGrower = [];
	reports = [];
	bugsDropDown = [];
	showLoader = true;
	loginUser;
	displayAllReports = [];
	constructor(private fb: FormBuilder, private bugService: BugService, private gs: GrowerService, private rs: ReportsService, private ds: DistrictService, private fs: FieldsService, private cus: CreateUserService, private toastr: ToastrService) {

		this.createForm();
		this.loginUserApi()

	}


	ngOnInit() {

	}


	createForm() {

		this.reoprtsForm = this.fb.group({
			selectOption: [null, Validators.required],
			id: [null, Validators.required],
		})
		this.reportsForm_add = this.fb.group({
			report_id: "",
			grower_id: "",
			field_id: ["", Validators.required],
			infection_level: ["", Validators.required],
			bug_id: ["", Validators.required],
			product_stabilization: [""],
			recommendations: ["", Validators.required],
			notes: [""],
		});
		this.generalForm = this.fb.group({
			general: [null, Validators.required],
		})


		// this.reportsForm_add.controls['product_stabilization'].setValue('test', {onlySelf: true});
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


	apiCall() {





		this.gs.getGrowerByRegionId(this.loginUser['district']).subscribe((data) => {
			this.growersDropDown = [...this.growersDropDown, ...data['data']];
		}, (error) => {
		}, () => {
			this.fieldApi()
		});
		this.bugService.getBugData().subscribe(data => {
			console.log(data['data']);

			this.bugsDropDown = [...this.bugsDropDown, ...data['data']];

		});
		this.rs.getReportsData().subscribe(data => {
			this.reports = [...this.reports, ...data['data']];
		}, (error) => {
			console.log(error)
		}, () => {
			// this.userApi();
		})
	}




	// tableUserData = []
	// userApi() {
	//   this.cus.getSuperVisorUser2("supervisor")
	// 	.then((data: Observable<any>) => {
	// 	  data.subscribe(data => {
	// 		console.log("user data", data);
	// 		this.tableUserData = data['users'];
	// 		this.filterGrowers();
	// 	  })

	// 	}, (error) => {
	// 	  console.log(error)
	// 	})

	// }





	// filterGrowerData = [];
	// filterGrowers() {
	//   console.log('Filter Grower');

	//   for (let i = 0; i < this.tableUserData.length; ++i) {
	// 	for (let j = 0; j < this.growersDropDown.length; ++j) {
	// 	  if (this.tableUserData[i]['user_id'] == this.growersDropDown[j]['supervisor_id']) {
	// 		this.filterGrowerData.push(this.growersDropDown[j]);
	// 	  }
	// 	}
	//   }
	//   console.log(this.filterGrowerData);

	// }



	findGrowerById(data) {
		let obj = this.growersDropDown.find(x => x['_id'] === data);
		let index = this.growersDropDown.indexOf(obj);
		return this.growersDropDown[index]['first_name'];
	}

	fieldApi() {
		this.fs.getFieldsData().subscribe((data) => {
			console.log(data);
			this.fieldsDropDown = [...this.fieldsDropDown, ...data['data']];
		}, (error) => {
			console.log(error);
		}, () => {
			this.reportsApi()
		})
	}

	reportsApi() {
		this.rs.getReportsDetailsData().subscribe((data) => {
			console.log(data);
			this.reportsData = data['data'];
		}, (error) => {
			console.log(error);
		}, () => {
			this.showTableData();
		})

	}


	filterReports = [];
	showTableData() {
		// this.displayData = [];
		// console.log('showTableData()');

		// for (let i = 0; i < this.reportsData.length; ++i) {
		// 	let body = {
		// 		field: this.changeIdToField(this.reportsData[i].field_id),
		// 		bug_type: this.reportsData[i].bug_id,
		// 		bug_level: this.reportsData[i].infection_level,
		// 		stabilization: this.reportsData[i].product_stabilization,
		// 		recommendation: this.reportsData[i].recommendations,
		// 		notes: this.reportsData[i].notes,
		// 	}
		// 	this.displayData.push(body);
		// 	if (i >= this.reportsData.length - 1) {
		// 		this.showLoader = false;
		// 	}
		// }
		// console.log(this.displayData);
		this.displayAllReports = [];
		this.filterReports = []
		for (let j = 0; j < this.reports.length; ++j) {
			for (let k = 0; k < this.growersDropDown.length; ++k) {
				if (this.reports[j]['grower_id'] == this.growersDropDown[k]['_id']) {
					this.filterReports.push(this.reports[j]);
				}
			}
		}



		for (let i = 0; i < this.filterReports.length; ++i) {
			console.log(this.filterReports[i]);
			let body = {
				grower_id: this.findGrowerById(this.filterReports[i].grower_id),
				reports: this.filterReports[i]._id,
				creation_date: this.filterReports[i].creation_date

			}
			this.displayAllReports.push(body)

		}


	}


	updateDisplayData(data) {
		console.log('showTableData()');

		let body = {
			field: this.changeIdToField(data.field_id),
			bug_type: data.bug_id,
			bug_level: data.infection_level,
			stabilization: data.product_stabilization,
			recommendation: data.recommendations,
			notes: data.notes,
		}
		this.displayData.push(body);
		console.log(this.displayData)
	}

	changeIdToField(data) {
		let obj = this.fieldsDropDown.find(x => x['_id'] === data);
		let index = this.fieldsDropDown.indexOf(obj);
		return this.fieldsDropDown[index]['field_name'];
	}


	changeIdToBug(data) {
		let obj = this.bugsDropDown.find(x => x['_id'] === data);
		let index = this.bugsDropDown.indexOf(obj);
		return this.bugsDropDown[index]['bug_name'];
	}


	growerIndex;
	onChange(value) {
		this.fieldsDropDown = [];
		this.growerIndex = value;
		this.reoprtsForm.patchValue({
			id: this.growersDropDown[value]['_id']
		})
		// this.allTabData(this.growersDropDown[value]['_id'])
		this.fs.getFieldById(this.growersDropDown[value]['_id']).subscribe((data) => {
			this.fieldsDropDown = [...this.fieldsDropDown, ...data['data']];
		}, (error) => {
			console.log(error);

		})

	}

	allTabData(id) {
		console.log("allTabData", id)

		this.rs.getReportsDataById(id).subscribe((data) => {
			console.log(data);
			this.reportsByGrower = data['data'];

			for (let i = 0; i < this.reportsByGrower.length; ++i) {
				this.reportsByGrower[i]['grower_id'] = this.findGrowerById(this.reportsByGrower[i]['grower_id'])
			}

		}, (error) => {
			console.log(error);

		})
	}

	onFieldChange(value) {
		this.fieldId = this.fieldsDropDown[value]['_id'];

		console.log(this.fieldId);

	}

	addTempData() {

		console.log(this.reportsForm_add.value);
		let body = {
			report_id: "",
			grower_id: this.growersDropDown[this.growerIndex]['_id'],
			field_id: this.reportsForm_add.value.field_id,
			infection_level: this.reportsForm_add.value.infection_level,
			bug_id: this.reportsForm_add.value.bug_id,
			bug_idName: this.changeIdToBug(this.reportsForm_add.value.bug_id),
			product_stabilization: this.reportsForm_add.value.product_stabilization,
			recommendations: this.reportsForm_add.value.recommendations,
			notes: this.reportsForm_add.value.notes,
			field_name: this.changeIdToField(this.reportsForm_add.value.field_id)
		}

		this.displayTempData.push(body);
		console.log(this.displayTempData);
		this.toastr.success('Add Invite!', 'Completes!');

		this.reportsForm_add.reset();
	}

	deleteTempData(index) {
		this.displayTempData.splice(index, 1);
		this.toastr.success('Delete Item!', 'Completes!');

	}

	createReports() {
		let user_data1 = localStorage.getItem('user_data')
		let user_data = JSON.parse((user_data1));
		let uid = user_data.sub;
		let d = new Date();
		let nDate = d.toLocaleDateString();
		let body = {
			report_opener_id: uid,
			grower_id: this.reoprtsForm.value.id,
			creation_date: nDate
		}

		this.rs.addReportsData(body).subscribe((data) => {
			this.reports = [...this.reports, ...data['data']];
			this.showTableData()
			this.reportId = data['data']['_id'];
		}, (error) => {
			console.log(error);

		}, () => {
			this.createReportsDetails();
			this.toastr.success('Add Invite!', 'Completes!');

			this.reportsForm_add.reset();

			// 	let fieldsPreviousData = this.reportsForm_add.value.field_id;
			// 	this.reportsForm_add.patchValue({
			// 		field_id: this.fieldId,
			// 		grower_id: this.reoprtsForm.value.id,
			// 		report_id: this.reportId
			// 	})
			// 	this.rs.addReportsDetailsData(this.reportsForm_add.value).subscribe((data) => {
			// 		console.log(data);
			// 		this.updateDisplayData(data['data'])
			// 	}, (error) => {
			// 		console.log(error);

			// 	}, () => {
			// 		this.reportsForm_add.patchValue({
			// 			field_id: fieldsPreviousData
			// 		})
			// })
		})
	}

	createReportsDetails() {

		for (let i = 0; i < this.displayTempData.length; ++i) {


			let body = {
				report_id: this.reportId,
				grower_id: this.displayTempData[i].grower_id,
				field_id: this.displayTempData[i].field_id,
				infection_level: this.displayTempData[i].infection_level,
				bug_id: this.displayTempData[i].bug_id,
				product_stabilization: this.displayTempData[i].product_stabilization,
				recommendations: this.displayTempData[i].recommendations,
				notes: this.displayTempData[i].notes,
			}
			this.rs.addReportsDetailsData(body).subscribe((data) => {
				console.log(data);
				// this.updateDisplayData(data['data'])
				this.reportsData = [...this.reportsData, data['data']];
			}, (error) => {
				console.log(error);

			}, () => {

			})

			if (i >= this.displayTempData.length - 1) {
				// this.showLoader = false;
				this.displayTempData = [];
			}

		}
	}




	modelData = [];
	deleteReportData;
	showDetailData(row) {
		console.log(row);
		console.log(this.reportsData);
		this.deleteReportData = row;
		this.modelData = this.reportsData.filter(data => data['report_id'] == row['reports'])
		console.log(this.modelData)
		for (let i = 0; i < this.modelData.length; ++i) {
			this.modelData[i]['bugName'] = this.changeIdToBug(this.modelData[i]['bug_id'])
			this.modelData[i]['field_name'] = this.changeIdToField(this.modelData[i]['field_id'])
		}
		console.log(this.modelData);

	}


	removeModelData(index, data) {
		console.log(data);
		console.log(index);

		
		this.rs.deleteReportsById(data['_id']).subscribe(res => {
			console.log(res);
		}, (error) => {
			console.log(error);
			this.toastr.error('Remove Report!', 'Error!');


		}, () => {
			console.log(this.reportsData);
			let delIndex = this.reportsData.indexOf(data);
			this.reportsData.splice(delIndex, 1);
			this.modelData.splice(index, 1);
			console.log(this.reportsData);
		this.toastr.success('Remove Report!', 'Completes!');

		})
	}

	deleteCompleteReport() {

		this.rs.deleteCompleteReports(this.deleteReportData['reports']).subscribe(res => {
			console.log(res);
		}, (error) => {
			console.log(error);
			this.toastr.success('Remove Report!', 'Error!');

		}, () => {
			let delIndex = this.displayAllReports.indexOf(this.deleteReportData);
			this.displayAllReports.splice(delIndex, 1);
			let delIndexAll = this.reports.indexOf(this.deleteReportData);
			this.reports.splice(delIndexAll, 1);
			this.toastr.success('Remove Report!', 'Completes!');

		})


		console.log(this.displayAllReports);

	}




}
