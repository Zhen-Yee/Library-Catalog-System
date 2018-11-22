import { PromoteUserComponent } from "./promote-user/promote-user.component";
import { AdminAuthenticateGuard } from "./_services/guards/admin-authenticate.guard";
import { UserAuthenticateGuard } from "./_services/guards/user-authenticate.guard";
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
import { HistoryComponent } from "./history/history.component";
import { BookDetailsComponent } from "./item-details/book-details/book-details.component";
import { MagazineDetailsComponent } from "./item-details/magazine-details/magazine-details.component";
import { MovieDetailsComponent } from "./item-details/movie-details/movie-details.component";
import { MusicDetailsComponent } from "./item-details/music-details/music-details.component";
import { ItemContainerComponent } from "./item-details/item-container/item-container.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { ReturnComponent } from "./return/return.component";


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
    path: "transactions",
    canActivate: [UserAuthenticateGuard],
    component: HistoryComponent

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
    canActivate: [UserAuthenticateGuard],
    component: DataTableComponent
  },
  {
    path: "search",
    canActivate: [UserAuthenticateGuard],
    component: SearchComponent
  },
  {
    path: "catalog/magazines",
    canActivate: [UserAuthenticateGuard],
    component: SortingMagazinesComponent
  },
  {
    path: "catalog/movies",
    canActivate: [UserAuthenticateGuard],
    component: SortingMoviesComponent
  },
  {
    path: "catalog/music",
    canActivate: [UserAuthenticateGuard],
    component: SortingMusicComponent
  },
  {
    path: "catalog/books",
    canActivate: [UserAuthenticateGuard],
    component: SortingBookComponent
  },
  {
    path: "shoppingcart",
    component: ShoppingCartComponent
  },
  {
    path: "details",
    component: ItemContainerComponent,
    children: [
    {
    path: "Book/:title",
    component: BookDetailsComponent
    },
    {
      path: "Movie/:title",
      component: MovieDetailsComponent
    },
    {
      path: "Magazine/:title",
      component: MagazineDetailsComponent
    },
    {
      path: "Music/:title",
      component: MusicDetailsComponent
    }
  ]
  },
  {
    path: "sort/details",
    component: ItemContainerComponent,
    children: [
    {
    path: "Book/:title",
    component: BookDetailsComponent
    },
    {
      path: "Movie/:title",
      component: MovieDetailsComponent
    },
    {
      path: "Magazine/:title",
      component: MagazineDetailsComponent
    },
    {
      path: "Music/:title",
      component: MusicDetailsComponent
    },
  ]
  },
  {
    path: "returns",
    component: ReturnComponent
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
