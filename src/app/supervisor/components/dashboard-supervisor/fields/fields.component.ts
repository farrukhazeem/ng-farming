import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from "@angular/forms";
import { GrowerService } from '../../../../providers/grower.service';
import { FieldsService } from '../../../../providers/fields.service';




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
	growersData = [];
	fieldsData = [];
	showFieldsData = [];
	growersDataSupervisor = [];
	constructor(private fb: FormBuilder, private gs: GrowerService, private fs: FieldsService) { }

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
			city: ['Karachi', Validators.required],
			id: ['', Validators.required]
		});
		this.addFieldForm = this.fb.group({
			field_name: ['', Validators.required],
			field_size: ['', Validators.required],
			seeding_date: ['', Validators.required],
			seeding_week: ['', Validators.required],
			grower_id: ['', Validators.required],
			city: ['Karachi', Validators.required],
		});
	}

	apiCall() {
		console.log('Api Call');
		this.gs.getGrowerData().subscribe((data) => {
			console.log('data', data['data']);
			this.growersData = [...this.growersData, ...data['data']];;
		}, (error) => {
			console.log('error', error);
		}, () => {
			this.GrowerApiData()
		})



	}

	
	fieldsApi() {
		this.fs.getFieldsData().subscribe((data) => {
			console.log('data', data['data']);
			this.fieldsData = [...this.fieldsData, ...data['data']];
		}, (error) => {
			console.log('error', error);
		}, () => {
			this.showTableData()
		})
	}


	GrowerApiData() {
		let uid = this.loginUid();
		this.gs.getGrowerById(uid).subscribe((data) => {
			console.log(data);
			this.growersDataSupervisor = [...this.growersDataSupervisor, ...data['data']];
		}, (error) => {
		}, () => {
			this.fieldsApi();

		});

	}

	showTableData() {
		for (let i = 0; i < this.fieldsData.length; ++i) {
			this.fieldsData[i].growerName = this.findGrowerByIdName(this.fieldsData[i]['grower_id']);


			if (i == this.fieldsData.length - 1)
				this.filterData();
		}
	}

	filterData() {
		for (let i = 0; i < this.fieldsData.length; ++i) {
			for (let j = 0; j < this.growersDataSupervisor.length; ++j) {

				if (this.fieldsData[i]['grower_id'] == this.growersDataSupervisor[j]['_id']) {
					this.showFieldsData.push(this.fieldsData[i]);
				}
			}
		}
	}


	findGrowerById(data) {
		let obj = this.growersData.find(x => x['_id'] === data);
		let index = this.growersData.indexOf(obj);
		return this.growersData[index]['first_name'];
	}

	findGrowerByIdName(data) {
		let obj = this.growersData.find(x => x['_id'] === data);
		return obj['first_name'];
	}

	loginUid() {
		let user_data1 = localStorage.getItem('user_data')
		let user_data = JSON.parse((user_data1));
		let uid = user_data.sub;
		return uid;
	}

	createFields() {
		let index = this.addFieldForm.value.grower_id;
		let body = {
			field_name: this.addFieldForm.value.field_name,
			field_size: this.addFieldForm.value.field_size,
			seeding_date: this.addFieldForm.value.seeding_date,
			seeding_week: this.addFieldForm.value.seeding_week,
			grower_id: this.growersData[index]['_id'],

		}
		console.log(body);
		this.fs.addFields(body).subscribe((data) => {
			this.fieldsData = [...this.fieldsData, ...data['data']];
			console.log('data', data);
			
		}, (error) => {
			console.log('error', error);
		}, () => {
			this.showTableData();
		})

	}

	editIndex;
	selectRow(data, index) {
		this.editIndex = index;
		this.editFieldForm.patchValue({
			field_name: data['field_name'],
			field_size: data['field_size'],
			seeding_date: data['seeding_date'],
			seeding_week: data['seeding_week'],
			grower_id: data['grower_id'],
			id: this.fieldsData[index]._id,
			city: data['city']

		});
	}

	editField() {
		console.log(this.editFieldForm.value);
		this.fs.editField(this.editFieldForm.value).subscribe((data) => {
			this.fieldsData[this.editIndex] = data['data'];
		}, (error) => {
			console.log('error', error);

		})

	}
}
