import { Routes } from '@angular/router';
import { ServicesComponent } from './components/services/services.component';
import { HomeComponent } from './components/home/home.component';
import { CareersComponent } from './components/careers/careers.component';
import { AboutComponent } from './components/about/about.component';
import { WorkComponent } from './components/work/work.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'about', component: AboutComponent },
  { path: 'work', component: WorkComponent },
  { 
    path: 'admin', 
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
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
