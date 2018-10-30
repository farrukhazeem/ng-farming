import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CreateUserService } from '../../../providers/create-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

declare let $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  createUserForm: FormGroup;

  tableUserData = [];

  constructor(public auth: AuthService, public http: HttpClient, public cus: CreateUserService, private fb: FormBuilder) {
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
      email: ['test@test.com', Validators.required],
      password: ['123123aA', Validators.required],
      first_name: ['qweqweqw', Validators.required],
      last_name: ['qweqweqw', Validators.required],
      phone: ['123123123', Validators.required],
      user_eskolnumber: ['123123123', Validators.required]
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

    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

token;

  createUser() {
    console.log("create user function");

    this.cus.getAccesToken().subscribe(data => {
        console.log(data);
        this.token = data['access_token']
    }, (error) => {
      console.log(error);
    }, () => {
      this.cus.createUser(this.createUserForm.value, this.token,"admin").subscribe(data => {
        console.log(data);

      }, error => {
        alert(error.message);
        console.log(error);
      }, () => {
        this.cus.createUserMongoDb(this.createUserForm.value).subscribe(data => {
          console.log(data);
          this.tableUserData = [...this.tableUserData, ...data['data']];

        }, (error) => {
          console.log(error);

        })
      })
    })



  }

}
