import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserManageComponent } from './user-manage/user-manage.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserLoginComponent } from './user-login/user-login.component';

import { UserManageService } from './services/user-manage.service';
import { AuthGuard } from './auth-guard';

import { userRoutes } from './user.routes';

@NgModule({
    declarations: [
        UserLoginComponent,
        UserManageComponent,
        UserCreateComponent,
        UserEditComponent,
        UserListComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        UserManageComponent
    ],
    providers: [
        UserManageService,
        AuthGuard
    ]
})
export class UserModule { }
