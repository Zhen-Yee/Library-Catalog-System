import { AdminAuthenticateGuard } from "./_services/guards/admin-authenticate.guard";
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./homepage/homepage.component";
import { RegisterComponent } from "./registration/register.component";
import { ConfirmationComponent } from "./registration/confirmation.component";
import { TestComponent } from "./test/test.component";
import { AddItemComponent } from "./add-item/add-item.component";

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
    path: "add",
    canActivate: [AdminAuthenticateGuard],
    component: AddItemComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
