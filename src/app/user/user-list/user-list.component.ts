import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import { User } from '../model/user-model';
import { UserManageService } from '../services/user-manage.service';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    public page : number;
    public pageSize : number;
    public totalPage : number;
    public previousPage : number;
    public nextPage : number;
    public userList : Array<User>;

    public curUserId : number;

    public arr = Array;

    constructor(public userManageService: UserManageService,
                private router: ActivatedRoute) {
        
    }

    ngOnInit() {
        this.router.queryParams.subscribe(
            (param : Params) => {
                console.log(param);

                this.page = param['page'] ? param['page'] : 1;
                this.pageSize = param['pageSize'] ? param['pageSize'] : 20;

                console.log('page = ' + this.page + '; page size = ' + this.pageSize);
            }
        );

        this.userManageService.list(this.page, this.pageSize).subscribe(
            data => {
                this.userList = data.items.data;
                this.totalPage = data.items.totalPage;
                this.previousPage = data.items.previousPage;
                this.nextPage = data.items.nextPage;
                console.log(this.userList);
            },
            error => {
                console.error(error);
            }
        );
    }
}