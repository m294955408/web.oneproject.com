import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Component({
    selector: 'blog-feedback',
    templateUrl: './blog-feedback.component.html',
    styleUrls: ['./blog-feedback.component.scss']
})
export class BlogFeedbackComponent implements OnInit {
    constructor(public http:Http) {
        
    }

    ngOnInit() {
            
    }
}