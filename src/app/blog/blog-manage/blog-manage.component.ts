import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Component({
    selector: 'blog-manage',
    templateUrl: './blog-manage.component.html',
    styleUrls: ['./blog-manage.component.scss']
})
export class BlogManageComponent implements OnInit {
    constructor(public http:Http) {
        
    }

    ngOnInit() {
            
    }
}