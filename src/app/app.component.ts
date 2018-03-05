import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { User } from './user/model/user-model';
import { UserAuthService } from './user/services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public currentUser: User;

  // 是否显示左侧菜单
  public isShowLeftMenu: boolean;

  constructor(public router: Router,
    public activatedRoute: ActivatedRoute,
    public titleService: Title,
    public userAuthService: UserAuthService) { }

  ngOnInit() {
    // 自定义标题
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title']));

    this.isShowLeftMenu = false;

    console.log(this.currentUser);

    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // 登录时给currentUser赋值
    this.userAuthService.currentUser
      .subscribe(
      data => {
        console.log("log success in app.component!");
        this.currentUser = data;
      },
      error => {
        console.error(error);
      }
      );
  }

  public doLogout() {
    this.userAuthService.logout()
      .subscribe(
      data => this.router.navigate(['home'])
      );
  }
}
