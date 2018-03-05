import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Component({
    selector: 'blog-draft',
    templateUrl: './blog-draft.component.html',
    styleUrls: ['./blog-draft.component.scss']
})
export class BlogDraftComponent implements OnInit {
    constructor(public http:Http) {
        
    }

    ngOnInit() {
            
    }
}