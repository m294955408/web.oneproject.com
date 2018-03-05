import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { BlogManageComponent } from './blog-manage/blog-manage.component';
import { BlogManageNavComponent } from './blog-manage-nav/blog-manage-nav.component';
import { BlogWriteComponent } from './blog-write/blog-write.component';
import { BlogCategoryComponent } from './blog-category/blog-category.component';
import { BlogFeedbackComponent } from './blog-feedback/blog-feedback.component';
import { BlogDraftComponent } from './blog-draft/blog-draft.component'; 
import { BlogDeletedComponent } from './blog-deleted/blog-deleted.component';

import { blogRoutes } from './blog.routes';
import { CategoryManageService } from './services/category-manager.service';
import { ArticleManageService } from './services/article-manager.service';

@NgModule({
    declarations: [
        BlogManageComponent,
        BlogManageNavComponent,
        BlogWriteComponent,
        BlogCategoryComponent,
        BlogFeedbackComponent,
        BlogDraftComponent,
        BlogDeletedComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        RouterModule.forChild(blogRoutes)
    ],
    exports: [
        BlogManageComponent
    ],
    providers: [
        CategoryManageService,
        ArticleManageService
    ]
})
export class BlogModule { }
