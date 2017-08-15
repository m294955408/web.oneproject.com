import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { User } from '../model/user-model';
import { UserManageService } from '../services/user-manage.service';
import { BaseUserForm } from '../common/user-form.base';

@Component({
    selector: 'user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent extends BaseUserForm implements OnInit {

    constructor(public fb: FormBuilder,
        public userManageService: UserManageService,
        public location: Location) {
            super();
            
    }

    ngOnInit() {
        this.buildForm();
    }

    buildForm(): void {
        this.userForm = this.fb.group({
            "userName": [
                this.userInfo.userName,
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(32)
                ]
            ],
            "nickName": [
                this.userInfo.nickName,
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(32)
                ]
            ],
            "email": [
                this.userInfo.email,
                [
                    Validators.pattern("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$")
                ]
            ],
            "phone": [
                this.userInfo.phone,
                [
                    Validators.pattern("^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$")
                ]
            ],
            "password": [
                this.userInfo.password,
                [
                    Validators.required,
                    Validators.pattern("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$")
                ]
            ],
            "confirmPassword": [
                this.userInfo.confirmPassword,
                [
                    Validators.required,
                    Validators.pattern("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$")
                ]
            ]
        });

        super.buildForm();
    }

    public doCreate() {
        if (this.userForm.valid) {
            this.userInfo = this.userForm.value;
            this.userManageService.create(this.userInfo)
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
        console.log(this.userInfo);
    }
}