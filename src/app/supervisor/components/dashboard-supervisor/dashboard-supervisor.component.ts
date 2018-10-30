import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { Route, Router, NavigationEnd } from "@angular/router";
declare let $;
@Component({
	selector: 'app-dashboard-supervisor',
	templateUrl: './dashboard-supervisor.component.html',
	styleUrls: ['./dashboard-supervisor.component.css']
})
export class DashboardSupervisorComponent implements OnInit {

	public showHeading: boolean;

	constructor(private router : Router,public auth: AuthService, public routes: Router) {
	}

	ngOnInit() {
		
		this.checkRoute();

		this.routes.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.checkRoute();
				console.log('check route :::>>>>', this.routes.url);
			}
		})


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

	public checkRoute(): void {
		const routeName: string = this.routes.url.toLowerCase();
		this.showHeading = routeName.includes('inviteManagement') || routeName.includes('reports') || routeName.includes('growers') || routeName.includes('invites')|| routeName.includes('fields') || routeName.includes('contract');
	}

}
