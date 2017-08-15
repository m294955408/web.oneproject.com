import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, Response, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

import { User } from '../model/user-model';

@Injectable()
export class UserManageService {
    //public userCreateURL = "mock-data/user-create-mock.json";

    public userFindURL: string = "api/account/find";
    public userListURL: string = "api/account/list";
    public userCreateURL: string = "api/account/create";
    public userEditURL: string = "api/account/edit";

    constructor(public http:Http) {
    }

    public find(id: number) {
        return this.http.get(this.userFindURL, { params: { id: id }})
                        .map((response: Response) => response.json());
    }

    public create(user: User) {
        return this.http.post(this.userCreateURL, user)
                        .map((response: Response) => response.json());
    }

    public list(page :number = 1, pageSize: number = 20) {
        return this.http.get(this.userListURL, { params: { page: page, pageSize: pageSize}})
                        .map((response: Response) => response.json());
    }

    public edit(id: number, user: User) {
        return this.http.post(this.userEditURL, user, { params: { id: id}})
                        .map((response: Response) => response.json());
    }
}