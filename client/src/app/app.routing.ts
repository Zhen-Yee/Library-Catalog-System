import { PromoteUserComponent } from "./promote-user/promote-user.component";
import { AdminAuthenticateGuard } from "./_services/guards/admin-authenticate.guard";
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./homepage/homepage.component";
import { RegisterComponent } from "./registration/register.component";
import { TestComponent } from "./test/test.component";
import { AddItemComponent } from "./add-item/add-item.component";
import {DataTableComponent} from "./dataTable/data-table.component";

const appRoutes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "register",
    canActivate: [AdminAuthenticateGuard],
    component: RegisterComponent
  },
  {
    path: "promote",
    canActivate: [AdminAuthenticateGuard],
    component: PromoteUserComponent
  },
  {
    path: "add",
    canActivate: [AdminAuthenticateGuard],
    component: AddItemComponent,
  },
  {
    path: "catalog",
    canActivate: [AdminAuthenticateGuard],
    component: DataTableComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
