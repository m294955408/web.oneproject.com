import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

export const appRoutes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    },
    {
        path: 'blog',
        loadChildren: './blog/blog.module#BlogModule'
    }
];