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
  { path: 'work', component: WorkComponent }
];
