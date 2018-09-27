import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './homepage/homepage.component';
import { RegisterComponent }   from './registration/register.component';
import { ConfirmationComponent }   from './registration/confirmation.component';
import { TestComponent }   from './test/test.component';


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