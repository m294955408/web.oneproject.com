import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, Response, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

import { Category } from '../model/category-model';

@Injectable()
export class CategoryManageService {
    //public userCreateURL = "mock-data/user-create-mock.json";

    public categoryFindURL: string = "api/blog/category/find";
    public categoryListURL: string = "api/blog/category/list";
    public categoryCreateURL: string = "api/blog/category/create";
    public categoryEditURL: string = "api/blog/category/edit";

    constructor(public http:Http) {
    }

    public find(id: number) {
        return this.http.get(this.categoryFindURL, { params: { id: id }})
                        .map((response: Response) => response.json());
    }

    public create(category: Category) {
        return this.http.post(this.categoryCreateURL, category)
                        .map((response: Response) => response.json());
    }

    public list() {
        return this.http.get(this.categoryListURL)
                        .map((response: Response) => response.json());
    }

    public edit(id: number, category: Category) {
        return this.http.post(this.categoryEditURL, category, { params: { id: id}})
                        .map((response: Response) => response.json());
    }
}