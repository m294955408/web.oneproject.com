import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserAuthService } from './services/user-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private route: Router,
		private userAuthService: UserAuthService) {

	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {


		let result = this.userAuthService.isLogin();

		result.subscribe(
			data => {
				if(!data) {
					this.route.navigate(['user/login']);
				}
			}
		);

		return result;
	}
}
