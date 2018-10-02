import { AdminAuthenticateGuard } from './guards/admin-authenticate.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './homepage/homepage.component';
import { RegisterComponent }   from './registration/register.component';
import { ConfirmationComponent }   from './registration/confirmation.component';
import { TestComponent }   from './test/test.component';
import {BookListComponent} from "./catalog/book-list/book-list.component";
import {CreateBookComponent} from "./catalog/create-book/create-book.component";



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
    path: 'book',
    component: BookListComponent
  },
  {
    path: "add",
    component: CreateBookComponent
  }
 ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
