import {RouterModule} from "@angular/router";

import { BlogManageComponent } from './blog-manage/blog-manage.component';
import { BlogWriteComponent } from './blog-write/blog-write.component';
import { BlogCategoryComponent } from './blog-category/blog-category.component';
import { BlogFeedbackComponent } from './blog-feedback/blog-feedback.component';
import { BlogDraftComponent } from './blog-draft/blog-draft.component'; 
import { BlogDeletedComponent } from './blog-deleted/blog-deleted.component';
import { AuthGuard } from '../user/auth-guard';

export const blogRoutes = [
    {
        path: '',
        redirectTo: 'manage',
        pathMatch: 'full'
    },
    {
        path: 'manage',
        component: BlogManageComponent,
        canActivate: [AuthGuard],
        data: { title: '博客管理'}
    },
    {
        path: 'write',
        component: BlogWriteComponent,
        canActivate: [AuthGuard],
        data: { title: '写文章'}
    },
    {
        path: 'category',
        component: BlogCategoryComponent,
        canActivate: [AuthGuard],
        data: { title: '类别管理'}
    },
    {
        path: 'feedback',
        component: BlogFeedbackComponent,
        canActivate: [AuthGuard],
        data: { title: '评论管理'}
    },
    {
        path: 'draft',
        component: BlogDraftComponent,
        canActivate: [AuthGuard],
        data: { title: '草稿箱' }
    },
    {
        path: 'deleted',
        component: BlogDeletedComponent,
        canActivate: [AuthGuard],
        data: { title: '回收站' }
    }
];