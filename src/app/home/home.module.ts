import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';

import { homeRoutes } from './home.routes';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        HomeComponent
    ],
    providers: [
    ]
})
export class HomeModule { }
