import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from "@angular/forms";
import { GrowerService } from '../../../../providers/grower.service';
import { FieldsService } from '../../../../providers/fields.service';
import { CreateUserService } from '../../../../providers/create-user.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'app-fields',
	templateUrl: './fields.component.html',
	styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit {
	demoArray = [
		{ growerName: 'Jake Jake', fieldName: 'ASD', fieldSize: 13, city: 'ABC', planDate: '12/09/2018', planWeek: 12 },
		{ growerName: 'Jake Jake', fieldName: 'ASD', fieldSize: 13, city: 'ABC', planDate: '12/09/2018', planWeek: 12 },
		{ growerName: 'Jake Jake', fieldName: 'ASD', fieldSize: 13, city: 'ABC', planDate: '12/09/2018', planWeek: 12 },
		{ growerName: 'Jake Jake', fieldName: 'ASD', fieldSize: 13, city: 'ABC', planDate: '12/09/2018', planWeek: 12 },
		{ growerName: 'Jake Jake', fieldName: 'ASD', fieldSize: 13, city: 'ABC', planDate: '12/09/2018', planWeek: 12 },
		{ growerName: 'Jake Jake', fieldName: 'ASD', fieldSize: 13, city: 'ABC', planDate: '12/09/2018', planWeek: 12 },
		{ growerName: 'Jake Jake', fieldName: 'ASD', fieldSize: 13, city: 'ABC', planDate: '12/09/2018', planWeek: 10 },

	];
	addArray = [
		{ growerName: 'Cell 3', fieldName: 'Cell 3', fieldSize: 'Cell 3', city: 'Cell 2', planDate: 'Cell 1' },
		{ growerName: 'Cell 3', fieldName: 'Cell 3', fieldSize: 'Cell 3', city: 'Cell 2', planDate: 'Cell 1' },
		{ growerName: 'Cell 3', fieldName: 'Cell 3', fieldSize: 'Cell 3', city: 'Cell 2', planDate: 'Cell 1' },
		{ growerName: 'Cell 3', fieldName: 'Cell 3', fieldSize: 'Cell 3', city: 'Cell 2', planDate: 'Cell 1' },

	];
	addFieldForm: FormGroup;
	editFieldForm: FormGroup;
	growersData = [{ "first_name": "" }];
	fieldsData = [];
	tableUserData = [];

	constructor(private fb: FormBuilder, private gs: GrowerService, private fs: FieldsService, private cus: CreateUserService, private toastr: ToastrService) { }

	ngOnInit() {
		this.createForm();
		this.apiCall();
	}

	createForm() {
		this.editFieldForm = this.fb.group({
			field_name: ['', Validators.required],
			field_size: ['', Validators.required],
			seeding_date: ['', Validators.required],
			seeding_week: ['', Validators.required],
			grower_id: ['', Validators.required],
			city: ['', Validators.required],
			id: ['', Validators.required],
			eshkol_number: ['', Validators.required],


		});
		this.addFieldForm = this.fb.group({
			field_name: ['', Validators.required],
			field_size: ['', Validators.required],
			seeding_date: ['', Validators.required],
			seeding_week: ['', Validators.required],
			grower_id: ['', Validators.required],
			city: ['', Validators.required],
			eshkol_number: ['', Validators.required],

		});
	}


	apiCall() {
		console.log('Api Call');
		this.gs.getGrowerData().subscribe((data) => {
			console.log('Grower data', data['data']);
			this.growersData = [...this.growersData, ...data['data']];;
		}, (error) => {
			console.log('error', error);
		}, () => {

			this.userApi();
		})
	}

	userApi() {
		this.cus.getSuperVisorUser("supervisor")
			.then((data: Observable<any>) => {
				data.subscribe(data => {
					console.log("user data", data);
					this.tableUserData = data['users'];
					this.fieldsApi();
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
			for (let j = 0; j < this.growersData.length; ++j) {
				if (this.tableUserData[i]['user_id'] == this.growersData[j]['supervisor_id']) {
					this.filterGrowerData.push(this.growersData[j]);
					console.log("==++---===")
				}
			}
		}
		console.log(this.filterGrowerData);

	}

	filterInviteData = [];
	compareData() {
		for (let i = 0; i < this.fieldsData.length; ++i) {
			for (let j = 0; j < this.filterGrowerData.length; ++j) {
				if (this.fieldsData[i]['grower_id'] == this.filterGrowerData[j]['_id']) {
					this.filterInviteData.push(this.fieldsData[i]);
				}
			}
		}

		this.showTableData();

	}


	fieldsApi() {
		this.fs.getFieldsData().subscribe((data) => {
			console.log('data', data['data']);
			this.fieldsData = [...this.fieldsData, ...data['data']];
		}, (error) => {
			console.log('error', error);
		}, () => {
			// this.showTableData();
			this.compareData();
		})
	}

	showTableData() {
		for (let i = 0; i < this.fieldsData.length; ++i) {
			this.fieldsData[i].growerName = this.findGrowerByIdName(this.fieldsData[i]['grower_id'])
		}

	}
	findGrowerById(data) {
		let obj = this.growersData.find(x => x['_id'] === data);
		let index = this.growersData.indexOf(obj);
		return this.growersData[index]['first_name'];
	}

	findGrowerByIdName(data) {
		try {
			let obj = this.growersData.find(x => x['_id'] === data)['first_name'];
			return obj;
		}
		catch (err) {
			console.log("No userFound");
			return "No User Found";
		}


	}

	createFields() {
		let index = this.addFieldForm.value.grower_id;
		let body = {
			field_name: this.addFieldForm.value.field_name,
			field_size: this.addFieldForm.value.field_size,
			seeding_date: this.addFieldForm.value.seeding_date,
			seeding_week: this.addFieldForm.value.seeding_week,
			grower_id: this.filterGrowerData[index]['_id'],
			city: this.addFieldForm.value.city,
			eshkol_number: this.addFieldForm.value.eshkol_number,


		}
		console.log(body);
		this.fs.addFields(body).subscribe((data) => {
			let tempGrower = this.findGrowerById(data['data']['grower_id'])
			data['data']['growerName'] = tempGrower;
			this.filterInviteData = [...this.filterInviteData, ...data['data']];
			console.log('data', data);
		}, (error) => {
			console.log('error', error);
			this.toastr.error('Edit Field!', 'Error!');

		}, () => {
			this.showTableData();
			this.addFieldForm.reset();
			this.toastr.success('Add Field!', 'Completes!');

		})

	}

	editIndex;
	selectRow(data, index) {
		this.editIndex = index;
		console.warn(data);
		this.editFieldForm.patchValue({
			field_name: data['field_name'],
			field_size: data['field_size'],
			seeding_date: data['seeding_date'],
			seeding_week: data['seeding_week'],
			grower_id: data['grower_id'],
			id: data['_id'],
			city: data['city'],
			eshkol_number: data['eshkol_number'],


		});
	}

	editField() {
		console.log(this.editFieldForm.value);
		this.fs.editField(this.editFieldForm.value).subscribe((data) => {
			this.afterEdit(data['data'])

		}, (error) => {
			console.log('error', error);
			this.toastr.error('Edit Field!', 'Error!');

		}, () => {
			this.editFieldForm.reset();
			this.toastr.success('Edit Field!', 'Completes!');

		})

	}


	afterEdit(data) {
		console.log(data);
		let obj = this.filterInviteData.find(x => x['_id'] === data['_id']);
		let index = this.filterInviteData.indexOf(obj);
		this.filterInviteData[index] = data;
		let gId = this.findGrowerById(this.filterInviteData[index]['grower_id'])
		this.filterInviteData[index]['growerName'] = gId;
	}
}