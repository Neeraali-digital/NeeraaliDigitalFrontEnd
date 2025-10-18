import { Routes } from '@angular/router';
import { WhatWeDo } from './components/what-we-do/what-we-do';
import { HomeComponent } from './components/home/home.component';
import { CareersComponent } from './components/careers/careers.component';
import { AboutComponent } from './components/about/about.component';
import { WorkComponent } from './components/work/work.component';
import { Contact } from './components/contact/contact';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'what-we-do', component: WhatWeDo },
  { path: 'what-we-do/:service', loadComponent: () => import('./components/service-detail/service-detail').then(m => m.ServiceDetail) },
  { path: 'careers', component: CareersComponent },
  { path: 'about', component: AboutComponent },
  { path: 'work', component: WorkComponent },
  { path: 'contact', component: Contact },
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'users', loadComponent: () => import('./admin/users/users.component').then(m => m.UsersComponent) },
      { path: 'blogs', loadComponent: () => import('./admin/blogs/blogs.component').then(m => m.BlogsComponent) },
      { path: 'enquiries', loadComponent: () => import('./admin/enquiries/enquiries.component').then(m => m.EnquiriesComponent) },
      { path: 'reviews', loadComponent: () => import('./admin/reviews/reviews.component').then(m => m.ReviewsComponent) }
    ]
  }
];
