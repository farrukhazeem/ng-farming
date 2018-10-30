import { log } from 'util';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from, ObservableInput } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class CreateUserService {

	constructor(public auth: AuthService, public http: HttpClient) {
	}

	data;

	getUser() {

		console.log('getUser')
		return this.auth.getUserProfile().then(data => {
			let user_data1 = localStorage.getItem('user_data')
			let user_data = JSON.parse((user_data1));
			let user_id = user_data.sub;
			console.log(user_id);
			console.warn('ssssssssssssssss ', data)
			return this.http.get('http://localhost:3000/api/users/' + user_id)


		}).catch(gg => console.error('an error occured ==> ', gg));
	}


	getSuperVisorUser(userType) {

		console.log('getUser')
		return new Promise((res, rej) => {

			let user_data1 = localStorage.getItem('user_data')
			let user_data = JSON.parse((user_data1));
			let user_id = user_data.sub;
			console.log(user_id);
			return res(
				this.http.get(`http://localhost:3000/api/get-user-supervisor/${user_id}/${userType}`)
			)
		})

	}


	getSuperVisorUser2(userType) {

		console.log('getUser')
		return new Promise((res, rej) => {
			let user_data1 = localStorage.getItem('user_data')
			let user_data = JSON.parse((user_data1));
			// let user_id = user_data.sub;
			let id = user_data['http://localhost:4200/user_metadata'].name;
			console.log(id);
			return res(
				this.http.get(`http://localhost:3000/api/get-user-supervisor/${id}/${userType}`)
			)
		})

	}


	getLoginUserData() {
		let user_data1 = localStorage.getItem('user_data')
		let user_data = JSON.parse((user_data1));
		let user_id = user_data.sub;
		console.log(user_id);
		return this.http.get(`http://localhost:3000/api/get-user-data/${user_id}`)

	}

	getSupervisorForARegion(id) {
		
		return this.http.get(`http://localhost:3000/api/get-supervisor-by-regionId/${id}`)
	}

	getSupervisorForARegionAndRole(id) {
		let userType = "supervisor";
		return this.http.get(`http://localhost:3000/api/get-user-by-region-and-user-type/${id}/${userType}`)
	}


	getSupervisorSuperVisorUser() {

		console.log('getUser')
		return new Promise((res, rej) => {

			let user_data1 = localStorage.getItem('user_data')
			let user_data = JSON.parse((user_data1));
			let user_id = user_data.sub;
			console.log(user_id);

			//  let id = user_data['http://localhost:4200/user_metadata'].name;
			// console.log(id);
			return res(
				this.http.get(`http://localhost:3000/api/get-user-supervisor-by-supersupervisor/:${user_id}`)
			)
		})

	}


	getSuperVisorUserForSuperSuperVisor() {
		console.log('getSuperVisorUserForSuperSuperVisor')

		return this.http.get('http://localhost:3000/api/get-user-supervisorForSupervisor')
	}

	getAccesToken() {

		const httpOptionsToken = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
			})
		};

		let body = {
			"grant_type": "client_credentials",
			"client_id": "hKrUGqWikPZYO4gdpqTohWAMu6SyMm1U",
			"client_secret": "dQxo3gOP60VdjgTLC9QE1ri5U3jZYP6ARcFIHMo5eX3-wpBJtVy1gkkgziPVm0D9",
			"audience": "https://sapwin.eu.auth0.com/api/v2/"
		}
		return this.http.post('https://sapwin.eu.auth0.com/oauth/token', body, httpOptionsToken)
	}





	createUser(userData, optionsHeader, new_role) {
		console.log('create user api call');
		console.log(userData);

		// this.data = this.auth.getUserProfile();
		// console.log(this.data);


		let user_data1 = localStorage.getItem('user_data')
		let user_data = JSON.parse((user_data1));
		// let new_role: string = "";
		// let roles = user_data['http://localhost:4200/app_metadata'].roles[0];
		// console.log(user_data['http://localhost:4200/app_metadata'].roles[0]);
		// if (roles == "admin") {
		// 	new_role = "super_supervisor";
		// }
		// else if (roles == "super_supervisor") {
		// 	new_role = "regional supervisor";
		// }
		// else {
		// 	new_role = "supervisor";
		// }

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + optionsHeader
			})
		};

		// const httpOptions2 = {
		//   headers: new HttpHeaders({
		//     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		//   })
		// };

		let url = 'https://sapwin.eu.auth0.com/api/v2/users';

		let body = {
			"user_id": "",
			"connection": "Username-Password-Authentication",
			"email": userData.email,
			"password": userData.password,
			"user_metadata": {
				"First_Name": userData.first_name,
				"Last_Name": userData.last_name,
				"Phone_Number": userData.phone,
				"name": user_data.sub,
				"user_eskolnumber": userData.user_eskolnumber
			},
			"email_verified": false,
			"verify_email": false,
			"app_metadata": {
				"roles": [
					new_role
				]
			}
		}




		console.log(body);



		return this.http.post(url, body, httpOptions)





		// let url2 = 'https://auth-ng6-start.auth0.com/dbconnections/users'

		// let body2 = {
		//   client_id: 'WooIm3FGwAoEGi7ltppuZiiqrPqjM4ma',
		//   email: 'test23@gmail.com',
		//   password: '123123aA',
		//   connection: 'Username-Password-Authentication'
		// }


		// let body3 = new HttpParams()
		//   .set('client_id', 'WooIm3FGwAoEGi7ltppuZiiqrPqjM4ma')
		//   .append('name', "test")
		//   .append('email', "test29@gmail.com")
		//   .append('password', '123123aA')
		//   .append('connection', 'Username-Password-Authentication')
		//   .append('First_Name', 'Taimoor')
		//   .append('Last_Name', 'Taimoor')
		//   .append('Phone_Number', '03002700');


		// let _body = JSON.stringify(body3);



	}

	createUserSuperVisor(userData, optionsHeader, new_role) {
		console.log('create user api call');
		console.log(userData);

		// this.data = this.auth.getUserProfile();
		// console.log(this.data);


		let user_data1 = localStorage.getItem('user_data')
		let user_data = JSON.parse((user_data1));

		let roles = user_data['http://localhost:4200/app_metadata'].roles[0];
		console.log(user_data['http://localhost:4200/app_metadata'].roles[0]);

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + optionsHeader
			})
		};

		let url = 'https://sapwin.eu.auth0.com/api/v2/users';

		let body = {
			"user_id": "",
			"connection": "Username-Password-Authentication",
			"email": userData.email,
			"password": userData.password,
			"user_metadata": {
				"First_Name": userData.firstName,
				"Last_Name": userData.lastName,
				"district": userData.district,
				"Phone_Number": userData.phone,
				"mobile": userData.phone,
				"id": user_data.sub,
				"user_eskolnumber": userData.eshkol_number
			},
			"email_verified": false,
			"verify_email": false,
			"app_metadata": {
				"roles": [
					new_role
				]
			}
		}




		console.log(body);



		return this.http.post(url, body, httpOptions)





		// let url2 = 'https://auth-ng6-start.auth0.com/dbconnections/users'

		// let body2 = {
		//   client_id: 'WooIm3FGwAoEGi7ltppuZiiqrPqjM4ma',
		//   email: 'test23@gmail.com',
		//   password: '123123aA',
		//   connection: 'Username-Password-Authentication'
		// }


		// let body3 = new HttpParams()
		//   .set('client_id', 'WooIm3FGwAoEGi7ltppuZiiqrPqjM4ma')
		//   .append('name', "test")
		//   .append('email', "test29@gmail.com")
		//   .append('password', '123123aA')
		//   .append('connection', 'Username-Password-Authentication')
		//   .append('First_Name', 'Taimoor')
		//   .append('Last_Name', 'Taimoor')
		//   .append('Phone_Number', '03002700');


		// let _body = JSON.stringify(body3);



	}

	updateEmail(email, optionsHeader, id) {
		console.log('create user api call');
		console.log(email);


		let user_data1 = localStorage.getItem('user_data')
		let user_data = JSON.parse((user_data1));
		let user_id = user_data.sub;

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + optionsHeader
			})
		};

		let url = `https://sapwin.eu.auth0.com/api/v2/users/${id}`;

		let body = {
			"email": email
		}
		console.log(body);
		return this.http.patch(url, body, httpOptions)

	}


	createUserMongoDb(userData) {

		let user_data1 = localStorage.getItem('user_data')
		let user_data = JSON.parse((user_data1));
		let email = user_data.name;

		let body2 = {
			"email": userData.email,
			"First_Name": userData.first_name,
			"Last_Name": userData.last_name,
			"Phone_Number": userData.phone,
			"user_eskolnumber": userData.user_eskolnumber,
			"user_id": userData.id,
			"creater_id": user_data.sub,
			"country_id": userData.country_id

		}
		console.log(body2);
		return this.http.post('http://localhost:3000/api/create-user', body2);
	}


	updateUserMongoDb(data) {
		console.log(data);

		let body = {
			email: data['email'],
			First_Name: data['first_name'],
			Last_Name: data['last_name'],
			Phone_Number: data['phone'],
			user_eskolnumber: data['user_eskolnumber'],
			user_id: data['id'],
			country_id: data['country_id']
		}


		console.log(body);
		return this.http.post('http://localhost:3000/api/edit-user', body);
	}


	createSupervisorUserMongoDb(userData) {

		let user_data1 = localStorage.getItem('user_data')
		let user_data = JSON.parse((user_data1));
		let email = user_data.name;

		let body3 = {
			"firstName": userData.firstName,
			"lastName": userData.lastName,
			"district": userData.district,
			"email": userData.email,
			"mobile": userData.mobile,
			"eshkol_number": userData.eshkol_number,
			"user_id": userData.id,
			"creater_id": user_data.sub,
			"userType": userData.userType,
			"country_id": userData.country_id
		}
		console.log(body3);
		return this.http.post('http://localhost:3000/api/create-user-supervisor', body3);
	}


	editSupervisor(data) {
		console.log(data);

		return this.http.post('http://localhost:3000/api/edit-user-supervisor', data);
	}



}
