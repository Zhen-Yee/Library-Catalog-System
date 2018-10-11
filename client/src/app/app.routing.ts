import { AdminAuthenticateGuard } from './guards/admin-authenticate.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './homepage/homepage.component';
import { RegisterComponent }   from './registration/register.component';
import {DataTableComponent} from "./dataTable/data-table.component";




const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent

  },
  {
    path: 'register',
    canActivate: [AdminAuthenticateGuard],
    component: RegisterComponent
  },
  {
    path: 'catalog',
    canActivate: [AdminAuthenticateGuard],
    component: DataTableComponent
  }
 ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
