import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';

import { Category } from '../model/category-model';
import { CategoryManageService } from '../services/category-manager.service';

@Component({
    selector: 'blog-category',
    templateUrl: './blog-category.component.html',
    styleUrls: ['./blog-category.component.scss']
})
export class BlogCategoryComponent implements OnInit {

    public categoryFrom : FormGroup;
    public categoryInfo: Category = new Category();

    public categoryList : Array<Category>;

    public curCategoryId : number;

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

    constructor(public fb: FormBuilder,
        public categoryManageService: CategoryManageService) {
        
    }

    ngOnInit() {
        this.buildForm(); 

        this.categoryManageService.list().subscribe(
            data => {
                console.log(data);
                this.categoryList = data.items;
                console.log(this.categoryList);
            },
            error => {
                console.error(error);
            }
        );
    }

    buildForm(): void {
        this.categoryFrom = this.fb.group({
            "name": [
                this.categoryInfo.name,
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(32)
                ]
            ]
        });

        this.categoryFrom.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    protected onValueChanged(data?: any) {
        if (!this.categoryFrom) {
            return;
        }
        const form = this.categoryFrom;
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

    public doCreate() {
        if (this.categoryFrom.valid) {
            this.categoryInfo = this.categoryFrom.value;
            this.categoryManageService.create(this.categoryInfo)
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
        console.log(this.categoryInfo);
    }

    public doEdit() {
        if (this.categoryFrom.valid) {
            this.categoryInfo = this.categoryFrom.value;
            this.categoryManageService.edit(this.curCategoryId, this.categoryInfo)
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
        console.log(this.categoryInfo);
    }

    public doFind(id: number) {
        this.categoryManageService.find(id)
            .subscribe(
                data => {
                    console.log(data);
                    
                    if(data.code === 1) {
                        this.categoryInfo = data.object;
                        this.curCategoryId = data.object.id;
                    }
                }
            );
    }
}