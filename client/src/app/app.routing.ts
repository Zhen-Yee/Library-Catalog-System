import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './homepage/homepage.component';
import { RegisterComponent }   from './registration/register.component';

const appRoutes: Routes = [
  { 
    path: '', 
    component: HomePageComponent

  },
  {
    path: 'register',
    component: RegisterComponent
  }
 ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);