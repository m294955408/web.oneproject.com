import { Component, OnInit, Input, SimpleChange  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { User } from '../model/user-model';
import { UserManageService } from '../services/user-manage.service';
import { BaseUserForm } from '../common/user-form.base';

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends BaseUserForm implements OnInit {

    @Input() id: number;

    constructor(public fb: FormBuilder,
        public userManageService: UserManageService,
        public location: Location) {
            super();
            
    }

    ngOnInit() {
        this.buildForm();
    }

    ngOnChanges(changes: SimpleChange) {
        if(this.id) {
            this.initForm();
        }
    }

    buildForm(): void {
        this.userForm = this.fb.group({
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
            ]
        });

        super.buildForm();
    }

    initForm(): void {
        this.userManageService.find(this.id)
            .subscribe(
                data => {
                    console.log(data);

                    if(data.code === 1) {
                         this.userInfo = data.object;
                    }
                }
            );
    }

    public doCreate() {
        if (this.userForm.valid) {
            this.userInfo = this.userForm.value;
            this.userManageService.edit(this.id, this.userInfo)
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