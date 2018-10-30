import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from "@angular/forms";
import { CreateUserService } from '../../../../providers/create-user.service';
import { Observable } from 'rxjs';
import { DistrictService } from '../../../../providers/district.service';
import { ToastrService } from 'ngx-toastr';
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

	constructor(private fb: FormBuilder, private cus: CreateUserService, private ds: DistrictService, private toastr: ToastrService) {
		this.createForm();
		this.apiCall();
	}

	apiCall() {
		this.cus.getSuperVisorUser("supervisor")
			.then((data: Observable<any>) => {
				data.subscribe(data => {
					console.log(data);
					this.tableUserData = data['users'];
				})
			}, (error) => {
				console.log(error)
			})

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
			id: [null],
			mobile: ['', Validators.required],
			eshkol_number: ['', Validators.required],
			password: ['123123aA'],
			userType: ['supervisor'],
			country_id: ['', Validators.required]

		})


		this.editSuperVisorForm = this.fb.group({
			firstName: ["", Validators.required],
			lastName: ["", Validators.required],
			district: ["", Validators.required],
			email: [null, Validators.required],
			mobile: ['', Validators.required],
			eshkol_number: ['', Validators.required],
			user_id: [null, Validators.required],
			country_id: ['', Validators.required]
		})
	}


	token;
	tableUserData = [];
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
					this.toastr.error('Create Supervisor!', 'Error!');

				}, () => {
					// this.superVisorForm.reset();
					this.clearUserForm();
					this.toastr.success('Create Supervisor!', 'Completes!');

				})
			})
		});
		
	}



	editIndex;
	editData;
	selectedRow(data, index) {
		console.log(data);
		console.log(index);
		this.editIndex = index;
		this.editData = data;
		this.editSuperVisorForm.patchValue({
			firstName: data['firstName'],
			lastName: data['lastName'],
			district: data['district'],
			email: data['email'],
			mobile: data['mobile'],
			eshkol_number: data['eshkol_number'],
			user_id: data['user_id'],
			userType: data['id'],
			country_id: data['country_id']
		});

		console.log(this.editSuperVisorForm.value);

	}



	updateUser() {
		this.cus.getAccesToken().subscribe(data => {
		  console.log(data);
		  this.token = data['access_token']
		}, (error) => {
		  console.log(error);
		}, () => {
		  if (this.editSuperVisorForm.value.email != this.editData['email']) {
			this.cus.updateEmail(this.editSuperVisorForm.value.email, this.token,this.editSuperVisorForm.value.user_id).subscribe(data => {
			  console.log(data);
	
			}, (error) => {
			  console.log(error);
			}, () => {
			  this.editUser()
			})
		  } else {
			this.editUser()
		  }
		})
	
	  }

	editUser() {
		console.log('asdbuyasgvdyuasvtyd');
		this.cus.editSupervisor(this.editSuperVisorForm.value).subscribe(data => {
			console.log(data);
			// this.tableUserData[this.editIndex] =data['data'];
			this.afterEdit(data['data'])
			console.log(this.tableUserData)
		}, (error) => {
			console.log(error);
			this.toastr.error('Edit Supervisor!', 'Error!');

		}, () => {
			this.editSuperVisorForm.reset();
			this.toastr.success('Edit Supervisor!', 'Completes!');

		})
	}


	clearUserForm() {

		this.superVisorForm.patchValue({
			firstName: "",
			lastName: "",
			district: "",
			email: "",
			id: "",
			mobile: "",
			eshkol_number: "",
			country_id: ""

		})

	}



	afterEdit(data) {
		console.log(data);
		
		let obj = this.tableUserData.find(x => x['_id'] === data['_id']);
		let index = this.tableUserData.indexOf(obj);
		this.tableUserData[index] = data;
		
	}

}
