import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { Router, CanActivate } from '@angular/router';

declare let $;
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(public auth: AuthService,private router : Router) { }

	ngOnInit() {
		

		$("#menu-toggle").click(function (e) {
			e.preventDefault();
			e.stopPropagation()
			$("#wrapper").toggleClass("toggled");

		});

		document.addEventListener('click', () => {
			let doc = document.getElementById('wrapper');
			if(doc !== null){
			doc.classList.add('toggled');
			}
		})

	}
	logout() {
		this.auth.logout();
	}

}
