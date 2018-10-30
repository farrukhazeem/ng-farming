import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DistrictService } from '../../../../providers/district.service';
import { CreateUserService } from '../../../../providers/create-user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-regional-supervisor',
	templateUrl: './regional-supervisor.component.html',
	styleUrls: ['./regional-supervisor.component.css']
})
export class RegionalSupervisorComponent implements OnInit {
	demoArray = [
		{ firstName: 'cell 1', lastName: 'cell 2', email: 'cell 3', phone: 'cell 1' },
		{ firstName: 'cell 1', lastName: 'cell 2', email: 'cell 3', phone: 'cell 1' },
		{ firstName: 'cell 1', lastName: 'cell 2', email: 'cell 6', phone: 'cell 1' }
	];
	createUserForm: FormGroup;
	editUserForm: FormGroup;
	regionDropDown;
	tableUserData = [];
	token;

	constructor(private fb: FormBuilder, private ds: DistrictService, public cus: CreateUserService, private toastr: ToastrService) {
		this.createForm();
		this.apiCall();
	}

	ngOnInit() {
	}


	apiCall() {
		this.ds.getDistrictData().subscribe(data => {
			console.log(data);
			this.regionDropDown = data['data'];
		}, (error) => {
			console.log(error);

		})

		this.cus.getSuperVisorUser("regional supervisor")
		.then((data: any) => {
			data.subscribe(data => {
				this.tableUserData = data['users'];
				console.log(this.tableUserData);
				
			})
		}, (error) => {
			console.log(error)
		})	 
	}	

	createForm() {
		this.createUserForm = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.required],
			district: ['', Validators.required],
			id: [''],
			eshkol_number: ['', Validators.required],
			mobile: ['', Validators.required],
			password: ['123123aA'],
			userType: ['regional supervisor'],
			country_id: ['', Validators.required]
		});


		this.editUserForm = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.required],
			district: ['', Validators.required],
			user_id: ['', Validators.required],
			eshkol_number: ['', Validators.required],
			mobile: ['', Validators.required],
			country_id: ['', Validators.required]
		});
	}



  createUser() {
    console.log("create user function");

    this.cus.getAccesToken().subscribe(data => {
      console.log(data);
      this.token = data['access_token']
    }, (error) => {
      console.log(error);
    }, () => {
      this.cus.createUser(this.createUserForm.value, this.token, "regional supervisor").subscribe(data => {
        console.log(data);
				this.createUserForm.patchValue({
          id: data['user_id']

        })
      }, error => {
        alert(error.message);
        console.log(error);
      }, () => {
        this.cus.createSupervisorUserMongoDb(this.createUserForm.value).subscribe(data => {
          console.log(data);
          this.tableUserData = [...this.tableUserData, ...data['data']];
					console.log(data);
        }, (error) => {
          console.log(error);
					this.toastr.error('Create Regional Supervisor!', 'Error!');

        }, () => {
					this.clearFormUser();
					this.toastr.success('Create Regional Supervisor!', 'Completes!');
				})
      })
	})
  }
	
	editIndex;
	editData;
  selectedRow(data, index) {
    // this.data = data;
     this.editIndex = index;
		this.editData = data;

    this.editUserForm.patchValue({
      firstName: data['firstName'],
      lastName: data['lastName'],
			email: data['email'],
			district: data['district'],
      user_id: data['user_id'],
      mobile: data['mobile'],
			eshkol_number: data['eshkol_number'],
			country_id : data['country_id'],
    });


		let body = {

		}
    console.log(this.editUserForm.value);

	}
	


  updateUser() {
    this.cus.getAccesToken().subscribe(data => {
      console.log(data);
      this.token = data['access_token']
    }, (error) => {
      console.log(error);
    }, () => {
      if (this.editUserForm.value.email != this.editData['email']) {
        this.cus.updateEmail(this.editUserForm.value.email, this.token,this.editUserForm.value.user_id).subscribe(data => {
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
		this.cus.editSupervisor(this.editUserForm.value).subscribe(data => {
			console.log(data);
			// this.tableUserData[this.editIndex] =data['data'];
			this.afterEdit(data['data']);
			console.log(this.tableUserData)
		}, (error) => {
			console.log(error);
			this.toastr.error('Edit District!', 'Error!');

		}, () => {
			this.editUserForm.reset();
			this.toastr.success('Edit District!', 'Completes!');
		})
	}



	clearFormUser() {
		this.createUserForm.patchValue({
			firstName: "",
			lastName: "",
			email: "",
			district: "",
			id: "",
			eshkol_number: "",
			mobile: "",
			country_id: ""
		});

	}
	
	
	afterEdit(data) {
		console.log(data);
		
		let obj = this.tableUserData.find(x => x['_id'] === data['_id']);
		let index = this.tableUserData.indexOf(obj);
		this.tableUserData[index] = data;
		
	}


}
