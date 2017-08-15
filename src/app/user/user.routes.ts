import {RouterModule} from "@angular/router";

import { UserManageComponent } from './user-manage/user-manage.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AuthGuard } from './auth-guard';



export const userRoutes = [
    {
        path: '',
        redirectTo: 'manage',
        pathMatch: 'full'
    },
    {
        path: 'manage',
        component: UserManageComponent,
        canActivate: [AuthGuard],
        data: { title: '用户管理'}
    },
    {
        path: 'login',
        component: UserLoginComponent,
        data: { title: '登录'}
    }
];