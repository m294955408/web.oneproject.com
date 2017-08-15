import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, Response, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

import { User } from '../model/user-model';

@Injectable()
export class UserAuthService {
    //public userCreateURL = "mock-data/user-create-mock.json";

    public userLoginURL: string = "api/account/login";
    public userLogoutURL: string = "api/account/logout";
    public userIsLoginURL: string = "api/account/isLogin";

    public subject: Subject<User> = new Subject<User>();
    public loginFlag: Subject<boolean> = new Subject<boolean>();

    constructor(public http:Http) { }

    public get currentUser():Observable<User> {
        return this.subject.asObservable();
    }

    public login(user: User) {
        return this.http
                .post(this.userLoginURL, user)
                .map((response: Response) => {
                    console.log(response);
                    let result = response.json();

                    if(result.isSuccess) {
                        // 登录成功
                        console.log("current user next object");
                        localStorage.setItem("currentUser",JSON.stringify(user));
                        this.subject.next(user);
                        console.log("current user next object finish");
                    }

                     return result;
                });
    }

    public logout() {
        return this.http
                .post(this.userLogoutURL, null)
                .map((response: Response) => {
                    localStorage.removeItem("currentUser");
                    this.subject.next(null);
                    return response;
                });
    }

    public isLogin() {
        this.http.get(this.userIsLoginURL)
                .map((response: Response) => response.json())
                .subscribe(
                    data => {
                        if(data.isSuccess) {
                            this.loginFlag.next(true);
                        }
                        else {
                            localStorage.removeItem("currentUser");
                            this.subject.next(null);
                            this.loginFlag.next(false);
                        }
                    }
                );

        return this.loginFlag;
    }
}