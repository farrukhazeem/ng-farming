import { FieldsService } from './../../../../providers/fields.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from "@angular/forms";
import { GrowerService } from '../../../../providers/grower.service';
import { ReportsService } from '../../../../providers/reports.service';
import { DistrictService } from '../../../../providers/district.service';
import { BugService } from 'src/app/providers/bug.service';
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
	displayAllReports = [];
	supervisorGrowers = [];
	reportsOfGrower = [];
	constructor(private fb: FormBuilder, private bugService: BugService, private gs: GrowerService, private rs: ReportsService, private ds: DistrictService, private fs: FieldsService, private toastr: ToastrService) {

		this.createForm();
		this.apiCall();
	}


	ngOnInit() {

	}


	createForm() {

		this.reoprtsForm = this.fb.group({
			selectOption: [null, Validators.required],
			id: [null, Validators.required],
		})
		this.reportsForm_add = this.fb.group({
			report_id: [null],
			grower_id: [null],
			field_id: [null, Validators.required],
			infection_level: [null, Validators.required],
			bug_id: [null, Validators.required],
			product_stabilization: [null],
			recommendations: [null, Validators.required],
			notes: [null],
		});
		this.generalForm = this.fb.group({
			general: [null, Validators.required],
		})
	}




	apiCall() {
		let uid = this.loginUid();
		

		this.gs.getGrowerById(uid).subscribe((data) => {
			console.log(data);
			this.supervisorGrowers = [...this.supervisorGrowers, ...data['data']];
		}, (error) => {
		}, () => {
			this.growerApi();

		});

		this.bugService.getBugData().subscribe(data => {
			console.log(data['data']);
			this.bugsDropDown = [...this.bugsDropDown, ...data['data']];
		});



	}



	growerApi() {
		this.gs.getGrowerData().subscribe((data) => {
			this.growersDropDown = [...this.growersDropDown, ...data['data']];
		}, (error) => {
		}, () => {
			this.fieldApi()
		});

	}

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
			this.getReportsOfGrower();
		})
	}

	reportsApi() {
		this.rs.getReportsDetailsData().subscribe((data) => {
			console.log(data);
			this.reportsData = data['data'];
		}, (error) => {
			console.log(error);
		}, () => {
			// this.showTableData();
		})

	}

	getReportsOfGrower() {

		for (let i = 0; i < this.supervisorGrowers.length; ++i) {
			this.rs.getReportsOfGrower(this.supervisorGrowers[i]['_id']).subscribe((data) => {
				console.log(data);
				this.reportsOfGrower = [...this.reportsOfGrower, ...data['data']];
			}, (error) => {
				console.log(error);
			}, () => {
				this.showTableData();
			})

			// if (i == this.supervisorGrowers.length - 1) {
			// 	console.log("index", i)

			// }
		}

	}

	showTableData() {

		console.log("<><><>");

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
		for (let i = 0; i < this.reportsOfGrower.length; ++i) {
			// console.log(this.reports[i]);
			let body = {
				grower_id: this.findGrowerById(this.reportsOfGrower[i].grower_id),
				reports: this.reportsOfGrower[i]._id,
				creation_date: this.reportsOfGrower[i].creation_date

			}
			this.displayAllReports.push(body);



		}


	}




	loginUid() {
		let user_data1 = localStorage.getItem('user_data')
		let user_data = JSON.parse((user_data1));
		let uid = user_data.sub;
		return uid;
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
			id: this.supervisorGrowers[value]['_id']
		})
		// this.allTabData(this.growersDropDown[value]['_id'])
		this.fs.getFieldById(this.supervisorGrowers[value]['_id']).subscribe((data) => {
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
			grower_id: this.reoprtsForm.value.id,
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
		this.reportsForm_add.reset();
		this.toastr.success('Add Report!', 'Completes!');
	}

	deleteTempData(index) {
		this.displayTempData.splice(index, 1);
		this.toastr.success('Delete Report!', 'Completes!');
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
			this.reportsOfGrower = [...this.reportsOfGrower, ...data['data']];
			this.showTableData()
			this.reportId = data['data']['_id'];
		}, (error) => {
			console.log(error);
			this.toastr.error('Add Report!', 'Error!');
		}, () => {
			this.createReportsDetails();
			this.toastr.success('Add Report!', 'Completes!');
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
		console.log(this.displayTempData);

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
			this.toastr.error('Delete Report!', 'Error!');

		}, () => {

			let delIndex = this.reportsData.indexOf(data);
			this.reportsData.splice(delIndex, 1);
			this.modelData.splice(index, 1);
			console.log(this.reportsData);
			this.toastr.success('Delete Report!', 'Completes!');
		})
	}

	deleteCompleteReport() {

		this.rs.deleteCompleteReports(this.deleteReportData['reports']).subscribe(res => {
			console.log(res);
		}, (error) => {
			console.log(error);
			this.toastr.error('Delete Report!', 'Error!');
		}, () => {
			console.log(this.displayAllReports);
			console.log(this.reportsOfGrower);

			this.toastr.success('Delete Report!', 'Completes!');
			let delIndex = this.displayAllReports.indexOf(this.deleteReportData);
			this.displayAllReports.splice(delIndex, 1);

			let delReportsAll = this.reportsOfGrower.indexOf(this.deleteReportData);
			this.reportsOfGrower.splice(delReportsAll, 1);
		})


		console.log(this.displayAllReports);

	}




}
