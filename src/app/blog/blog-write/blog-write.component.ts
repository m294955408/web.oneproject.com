import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Article } from '../model/article-model';
import { ArticleManageService } from '../services/article-manager.service';

declare var $:any;

@Component({
    selector: 'blog-write',
    templateUrl: './blog-write.component.html',
    styleUrls: ['./blog-write.component.scss']
})
export class BlogWriteComponent implements OnInit {

    public articleFrom : FormGroup;
    public articleInfo : Article = new Article();

    public formErrors = {
        'name': '',
        'formError': ''
    };

    validationMessages = {
        'name': {
            'required': '类别名称必须输入。',
            'minlength': '类别名称必须4到32个字符。'
        }
    };

    constructor(public http:Http,
        public fb: FormBuilder,
        public articleManageService: ArticleManageService) {
        this.articleInfo.type = 0;
    }

    ngOnInit() {
        $("#some-textarea").markdown({language: "zh"});

        this.buildForm(); 
    }

    buildForm(): void {
        this.articleFrom = this.fb.group({
            "type": [
                this.articleInfo.type,
                []
            ],
            "title": [
                this.articleInfo.title,
                []
            ],
            "content": [
                this.articleInfo.content,
                []
            ],
            "tags": [
                this.articleInfo.tags,
                []
            ],
            "categories": [
                this.articleInfo.categories,
                []
            ],
            "summary": [
                this.articleInfo.summary,
                []
            ]
        });

        this.articleFrom.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    protected onValueChanged(data?: any) {
        if (!this.articleFrom) {
            return;
        }
        const form = this.articleFrom;
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    public doPublish() {
        console.log(this.articleInfo);
        this.articleFrom.value.type = this.articleInfo.type;
        if (this.articleFrom.valid) {
            this.articleInfo = this.articleFrom.value;
            console.log(this.articleInfo);
            this.articleManageService.create(this.articleInfo)
                .subscribe(
                data => {
                    if(data.code === 1) {
                        window.location.reload();
                    }
                    else {
                        this.formErrors.formError = data.msg;
                    }
                    
                    console.log(data);
                },
                error => {
                    this.formErrors.formError = error.message;

                    console.error(error);
                }
                );
        } else {
            this.formErrors.formError = "存在不合法的输入项，请检查。";
        }
        
    }

    public doSave() {

    }
}   