import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserService } from 'src/app/providers/create-user.service';
import { DistrictService } from 'src/app/providers/district.service';
import { Observable, from, ObservableInput } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'app-districts',
	templateUrl: './districts.component.html',
	styleUrls: ['./districts.component.css']
})
export class DistrictsComponent implements OnInit {

	createDistrictForm: FormGroup;
	editDistrictForm: FormGroup;
	districtData = [];
	editIndex;


	constructor(private fb: FormBuilder, private districtService: DistrictService, private toastr: ToastrService) {

		this.districtService.getDistrictData()
			.subscribe((data) => {
				console.log(data);
				this.districtData = [...this.districtData, ...data['data']];
			}
				, (error) => {
					console.log(error)
				})
	}


	ngOnInit() {
		this.createForm();
		this.editForm();
	}


	createForm() {
		this.createDistrictForm = this.fb.group({
			districtName: ['', Validators.required],
		});
	}

	editForm() {
		this.editDistrictForm = this.fb.group({
			edit_districtName: ['', Validators.required],
		});
	}

	edit() {
		console.log(this.editDistrictForm.value);
		let body = {
			id: this.districtData[this.editIndex]['_id'],
			region_name: this.editDistrictForm.value.edit_districtName
		}
		// console.log(body);

		this.districtService.editRegion(body).subscribe(data => {
			// this.districtData[this.editIndex] = data['data'];
			this.afterEdit(data['data']);
			console.log(this.districtData);
		}, (error) => {
			console.log(error);
			this.toastr.error('Update District!', 'Fails!');

		}, () => {
			this.editDistrictForm.reset();
			this.toastr.success('Update District!', 'Completes!');

		})


	}

	addDestrict() {
		console.log(this.createDistrictForm.value);
		this.districtService.addRegion(this.createDistrictForm.value).subscribe(data => {
			this.districtData = [...this.districtData, ...data['data']];
			console.log(this.districtData);


		}, (error) => {
			console.log(error);
			this.toastr.error('Create District!', 'Fails!');

		}, () => {
			this.createDistrictForm.reset();
			this.toastr.success('Create District!', 'Completes!');

		})
	}

	selectedRow(data, index) {
		this.editDistrictForm.setValue({
			edit_districtName: data.region_name
		});

		this.editIndex = index;

	}

	afterEdit(data) {
		console.log(data);
		let obj = this.districtData.find(x => x['_id'] === data['_id']);
		let index = this.districtData.indexOf(obj);
		this.districtData[index] = data;
	}

}
