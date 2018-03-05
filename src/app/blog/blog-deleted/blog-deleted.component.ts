import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Component({
    selector: 'blog-deleted',
    templateUrl: './blog-deleted.component.html',
    styleUrls: ['./blog-deleted.component.scss']
})
export class BlogDeletedComponent implements OnInit {
    constructor(public http:Http) {
        
    }

    ngOnInit() {
            
    }
}