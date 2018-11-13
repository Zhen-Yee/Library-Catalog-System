import { PromoteUserComponent } from "./promote-user/promote-user.component";
import { AdminAuthenticateGuard } from "./_services/guards/admin-authenticate.guard";
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./homepage/homepage.component";
import { RegisterComponent } from "./registration/register.component";
import { AddItemComponent } from "./add-item/add-item.component";
import { DataTableComponent} from "./dataTable/data-table.component";
import { SearchComponent} from "./search/search.component";
import {SortingMagazinesComponent} from "./dataTable/sorting-magazines/sorting-magazines.component";
import {SortingMoviesComponent} from "./dataTable/sorting-movies/sorting-movies.component";
import { SortingMusicComponent } from "./dataTable/sorting-music/sorting-music.component";
import {SortingBookComponent} from "./dataTable/sorting-book/sorting-book.component";
import { BookDetailsComponent } from "./item-details/book-details/book-details.component";


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
  },
  {
    path: "search",
    canActivate: [AdminAuthenticateGuard],
    component: SearchComponent
  },
  {
    path: "catalog/magazines",
    canActivate: [AdminAuthenticateGuard],
    component: SortingMagazinesComponent
  },
  {
    path: "catalog/movies",
    canActivate: [AdminAuthenticateGuard],
    component: SortingMoviesComponent
  },
  {
    path: "catalog/music",
    canActivate: [AdminAuthenticateGuard],
    component: SortingMusicComponent
  },
  {
    path: "catalog/books",
    canActivate: [AdminAuthenticateGuard],
    component: SortingBookComponent
  },
  {
    path: "details",
    component: BookDetailsComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
