import { AdminAuthenticateGuard } from './guards/admin-authenticate.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './homepage/homepage.component';
import { RegisterComponent }   from './registration/register.component';
import {DataTableComponent} from "./dataTable/data-table.component";
import { ConfirmationComponent }   from './registration/confirmation.component';
import { DeleteItemComponent } from "./delete-item/delete-item.component";


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
  },
  {
    path: "deleteitem",
    canActivate: [AdminAuthenticateGuard],
    component: DeleteItemComponent
  }
 ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
