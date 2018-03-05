import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, Response, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

import { Article } from '../model/article-model';

@Injectable()
export class ArticleManageService {
    //public userCreateURL = "mock-data/user-create-mock.json";

    public articleCreateURL: string = "api/blog/create";

    constructor(public http:Http) {
    }

    public create(article: Article) {
        return this.http.post(this.articleCreateURL, article)
                        .map((response: Response) => response.json());
    }
}