import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { Router } from '@angular/router';

declare let $;
@Component({
	selector: 'app-dashboard-super-supervisor',
	templateUrl: './dashboard-super-supervisor.component.html',
	styleUrls: ['./dashboard-super-supervisor.component.css']
})
export class DashboardSuperSupervisorComponent implements OnInit {
	constructor(private router : Router,public auth: AuthService) { }

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
