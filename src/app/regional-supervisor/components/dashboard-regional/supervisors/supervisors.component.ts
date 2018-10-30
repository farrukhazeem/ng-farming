import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from "@angular/forms";
import { CreateUserService } from '../../../../providers/create-user.service';
import { Observable } from 'rxjs';
import { DistrictService } from '../../../../providers/district.service';

@Component({
	selector: 'app-supervisors',
	templateUrl: './supervisors.component.html',
	styleUrls: ['./supervisors.component.css']
})
export class SupervisorsComponent implements OnInit {
	demoArray = [
		{ firstName: 'cell 1', lastName: 'cell 2', email: 'cell 3' },
		{ firstName: 'cell 1', lastName: 'cell 2', email: 'cell 3' },
		{ firstName: 'cell 1', lastName: 'cell 2', email: 'cell 6' }

	];
	superVisorForm: FormGroup;
	editSuperVisorForm: FormGroup;
	regionDropDown;
	tableUserData = [];
	loginUser;
	constructor(private fb: FormBuilder, private cus: CreateUserService, private ds: DistrictService) {
		this.createForm();
		this.loginUserApi();
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

		this.cus.getSupervisorForARegionAndRole(this.loginUser['district']).subscribe((data) => {
			this.tableUserData = data['users'];
		}, (error) => {
		}, () => {
			
		});

		// this.cus.getSuperVisorUser2("supervisor")
		// 	.then((data: Observable<any>) => {
		// 		data.subscribe(data => {
		// 			console.log(data);
		// 			this.tableUserData = data['users'];
		// 		})
		// 	}, (error) => {
		// 		console.log(error)
		// 	})

		this.ds.getDistrictData().subscribe(data => {
			console.log(data);
			this.regionDropDown = data['data'];
		}, (error) => {
			console.log(error);
		})

	}

	ngOnInit() {
	}


	createForm() {

		this.superVisorForm = this.fb.group({
			firstName: ["", Validators.required],
			lastName: ["", Validators.required],
			district: ["", Validators.required],
			email: [null, Validators.required],
			id: [null, Validators.required],
			mobile: ['', Validators.required],
			eshkol_number: ['', Validators.required],
			password: ['123123aA'],
			userType: ['supervisor'],
			country_id : ['', Validators.required]
		})


		this.editSuperVisorForm = this.fb.group({
			firstName: ["", Validators.required],
			lastName: ["", Validators.required],
			district: ["", Validators.required],
			email: [null, Validators.required],
			mobile: ['', Validators.required],
			eshkol_number: ['', Validators.required],
			user_id: [null, Validators.required],
			password: ['123123aA'],
			userType: ['supervisor'],
			country_id : ['', Validators.required]
		})
	}


	token;
	
	createUser() {

		console.log("create user function", this.superVisorForm.value);

		this.cus.getAccesToken().subscribe(data => {
			console.log(data);
			this.token = data['access_token']
		}, (error) => {
			console.log(error.message);
		}, () => {
			this.cus.createUserSuperVisor(this.superVisorForm.value, this.token, "supervisor").subscribe(data => {
				console.log(data);
				this.superVisorForm.patchValue({
					id: data['user_id']
				})
			}, (error) => {
				alert(error.message);
				console.log(error);
			}, () => {
				console.log("Complete");

				this.cus.createSupervisorUserMongoDb(this.superVisorForm.value).subscribe(data => {
					console.log(data);
					this.tableUserData = [...this.tableUserData, ...data['data']];
					console.log(this.tableUserData)
				}, (error) => {
					console.log(error);

				})
			})
		})
	}



	editIndex
	selectedRow(data, index) {
		console.log(data);
		console.log(index);
		this.editIndex = index;
		this.superVisorForm.patchValue({
			firstName: data['firstName'],
			lastName: data['lastName'],
			district: data['district'],
			email: data['email'],
			mobile: data['mobile'],
			eshkol_number: data['eshkol_number'],
			id: data['user_id'],
			userType: data['id'],
			country_id: data['country_id']
		});

		console.log(this.superVisorForm.value);

	}


	editUser() {
		console.log('asdbuyasgvdyuasvtyd');
		this.cus.editSupervisor(this.editSuperVisorForm.value).subscribe(data => {
			console.log(data);
			this.tableUserData[this.editIndex] =data['data'];
			console.log(this.tableUserData)
		}, (error) => {
			console.log(error);
		})
	}
}
