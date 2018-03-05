import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../model/user-model';
import { UserAuthService } from '../services/user-auth.service';
import { BaseUserForm } from '../common/user-form.base';

@Component({
    selector: 'user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent extends BaseUserForm implements OnInit {

    constructor(public fb: FormBuilder,
        public userAuthService: UserAuthService,
        public router: Router) {
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
            "password": [
                this.userInfo.password,
                [
                    Validators.required,
                    Validators.pattern("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$")
                ]
            ]
        });

        super.buildForm();
    }

    public doLogin() {
        if (this.userForm.valid) {
            this.userInfo = this.userForm.value;
            this.userAuthService.login(this.userInfo)
                .subscribe(
                data => {
                    if(data.isSuccess) {
                        var searchParams = new URLSearchParams(location.search.slice(1));
                        console.log(searchParams.get("returnUrl"));
                        this.router.navigate([searchParams.get("returnUrl")]);
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