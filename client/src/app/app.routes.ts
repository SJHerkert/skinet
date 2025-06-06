import { Routes } from '@angular/router';
import { NgModule } from '@angular/core'
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}},
    {path: 'test-error', component: TestErrorComponent, data: {breadcrumb: 'Test Errors'}},
    {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'}},
    {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not found'}},
    {path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule),
    data: {breadcrumb: 'Shop'}},  
    {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

