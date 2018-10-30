import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../providers/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CreateUserService } from '../../../../providers/create-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

declare let $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  demoArray = [
    { firstName: 'cell 1', lastName: 'cell 2', email: 'cell 3', phone: 'cell 1' },
    { firstName: 'cell 1', lastName: 'cell 2', email: 'cell 3', phone: 'cell 1' },
    { firstName: 'cell 1', lastName: 'cell 2', email: 'cell 6', phone: 'cell 1' }

  ];
  createUserForm: FormGroup;
  editUserForm: FormGroup;
  tableUserData = [];
  token;
  editData = Object;
  editIndex;


  constructor(public auth: AuthService, public http: HttpClient, public cus: CreateUserService, private fb: FormBuilder,  private toastr: ToastrService) {
    auth.handleAuthentication();
    this.createForm();
    this.cus.getUser()
      .then((data: Observable<any>) => {

        console.log(data);
        data.subscribe(data => {
          this.tableUserData = data['users'];
          console.log(data);

        })
      }, (error) => {
        console.log(error)
      })
  }


  createForm() {
    this.createUserForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      id: [''],
      password: ['123123aA'],
      phone: ['123123123', Validators.required],
      user_eskolnumber: ['', Validators.required],
      country_id: ['', Validators.required]

    });
    this.editUserForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      id: ['', Validators.required],
      phone: ['123123123', Validators.required],
      user_eskolnumber: ['', Validators.required],
      country_id: ['', Validators.required]
    });
  }

  //temp

  showData() {
    console.log(this.createUserForm.value);
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {

  }



  createUser() {
    console.log("create user function");

    this.cus.getAccesToken().subscribe(data => {
      console.log(data);
      this.token = data['access_token']
    }, (error) => {
      console.log(error);
    }, () => {
      this.cus.createUser(this.createUserForm.value, this.token, "super_supervisor").subscribe(data => {
        console.log(data);
        this.createUserForm.patchValue({
          id: data['user_id']

        })
        console.log(this.createUserForm.value);

      }, error => {
        alert(error.message);
        console.log(error);
      }, () => {
        this.cus.createUserMongoDb(this.createUserForm.value).subscribe(data => {
          console.log(data);
          this.tableUserData = [...this.tableUserData, ...data['data']];

        }, (error) => {
          console.log(error);
          this.toastr.error('Create Super Supervisor!', 'Fails!');
        }, () => {
          this.createUserForm.reset();
          this.toastr.success('Create Super Supervisor!', 'Completes!');
          this.clearForm()
        })
      })
    })
  }



  selectedRow(data, index) {
    this.editData = data;
    this.editIndex = index;

    this.editUserForm.setValue({
      first_name: data['First_Name'],
      last_name: data['Last_Name'],
      email: data['email'],
      id: data['user_id'],
      phone: data['Phone_Number'],
      user_eskolnumber: data['user_eskolnumber'],
      country_id: data['country_id'],
    });


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
        this.cus.updateEmail(this.editUserForm.value.email, this.token, this.editUserForm.value.id).subscribe(data => {
          console.log(data);

        }, (error) => {
          console.log(error);
        }, () => {
          this.sendDataToUser()
        })
      } else {
        this.sendDataToUser()
      }
    })

  }

  sendDataToUser() {
    console.log('Testing User');
    console.log(this.editUserForm);

    this.cus.updateUserMongoDb(this.editUserForm.value)
      .subscribe(data => {
        console.log(data);
        // this.tableUserData[this.editIndex] = data['data'];
        this.afterEdit(data['data'])

      }, (error) => {
        console.log(error);
        this.toastr.error('Update Super Supervisor!', 'Fails!');
      }, () => {
        this.clearForm()
        this.toastr.success('Update Super Supervisor!', 'Completes!');
      })
  }


  clearForm() {
    this.editUserForm.setValue({
      first_name: "",
      last_name: "",
      email: "",
      id: "",
      user_eskolnumber: "",
      phone: "",
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
