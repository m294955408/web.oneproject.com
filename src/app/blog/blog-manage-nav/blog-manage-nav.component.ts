import { Component, Input, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Component({
    selector: 'blog-manage-nav',
    templateUrl: './blog-manage-nav.component.html',
    styleUrls: ['./blog-manage-nav.component.scss']
})
export class BlogManageNavComponent implements OnInit {
    constructor(public http:Http) {
        
    }

    @Input() type: string;

    ngOnInit() {
            
    }
}