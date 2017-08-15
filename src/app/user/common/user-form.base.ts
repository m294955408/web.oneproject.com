import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../model/user-model';

export abstract class BaseUserForm {

    public userForm: FormGroup;
    public userInfo: User = new User();

    public formErrors = {
        'userName': '',
        'nickName': '',
        'phone': '',
        'email': '',
        'password': '',
        'confirmPassword': '',
        'formError': ''
    };

    validationMessages = {
        'userName': {
            'required': '用户名必须输入。',
            'minlength': '用户名4到32个字符。'
        },
        'nickName': {
            'required': '昵称必须输入。',
            'minlength': '昵称2到32个字符。'
        },
        'email': {
            'pattern': '请输入正确的邮箱地址。'
        },
        'phone': {
            'pattern': '请输入正确的手机号码。'
        },
        'password': {
            'required': '密码必需输入。',
            'pattern': '密码格式不正确，正确格式为0-9a-zA-Z的组合'
        },
        'confirmPassword': {
            'required': '请确认密码',
            'pattern': '密码格式不正确，正确格式为0-9a-zA-Z的组合',
            'validateEqual': "两次输入的密码不一致。"
        }
    };

    constructor() {
        
    }

    protected onValueChanged(data?: any) {
        if (!this.userForm) {
            return;
        }
        const form = this.userForm;
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

    protected buildForm(): void {
        this.userForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }
}