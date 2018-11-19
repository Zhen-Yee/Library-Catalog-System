import { MusicDetailsComponent } from "./item-details/music-details/music-details.component";
import { MovieDetailsComponent } from "./item-details/movie-details/movie-details.component";
import { MagazineDetailsComponent } from "./item-details/magazine-details/magazine-details.component";
import { BookDetailsComponent } from "./item-details/book-details/book-details.component";
import { AddBookComponent } from "./add-item/add-book/add-book.component";
import { AdminAuthenticateGuard } from "./_services/guards/admin-authenticate.guard";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./registration/register.component";
import { HomePageComponent } from "./homepage/homepage.component";
import { RouterModule, RouteReuseStrategy } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { TestComponent } from "./test/test.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {
  MatFormFieldModule, MatButtonModule, MatInputModule, MatToolbarModule, MatMenuModule, MatDialogModule,
  MatCardModule, MatSelectModule, MatSnackBarModule, MatPaginatorModule, MatChipsModule, MatSortModule,
  MatProgressSpinnerModule, MatProgressBarModule
} from "@angular/material";
import { MatSidenavModule } from "@angular/material/sidenav";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { routing } from "./app.routing";
import { LoginComponent } from "./login/login.component";
import { ActiveUsersSideNavComponent } from "./active-users-side-nav/active-users-side-nav.component";
import { ConfirmationComponent } from "./registration/confirmation.component";
import { PasswordService } from "./_services/PasswordService";
import { RegistrationErrorComponent } from "./registration/registration_error.component";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { UserService } from "./_services/user.service";
import { ToggleService } from "./_services/ToggleService";
import { DeleteItemComponent } from "./delete-item/delete-item.component";
import { AddItemComponent } from "./add-item/add-item.component";
import { AddMusicComponent } from "./add-item/add-music/add-music.component";
import { AddMoviesComponent } from "./add-item/add-movies/add-movies.component";
import { AddMagazineComponent } from "./add-item/add-magazine/add-magazine.component";
import { DataTableComponent } from "./dataTable/data-table.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { ShoppingCartItemComponent } from './shopping-cart/shopping-cart-item/shopping-cart-item.component';
import { CheckoutComponent } from "./checkout/checkout.component";
import { MatTableModule } from "@angular/material/table";
import { UpdateBookComponent } from "./update-item/update-book/update-book.component";
import { UpdateMagazineComponent } from "./update-item/update-magazine/update-magazine.component";
import { UpdateMusicComponent } from "./update-item/update-music/update-music.component";
import { PromoteUserComponent } from "./promote-user/promote-user.component";
import { UpdateMovieComponent } from "./update-item/update-movie/update-movie.component";
import { DeleteItemPromptDialogComponent } from "./delete-item-prompt-dialog/delete-item-prompt-dialog.component";
import { SearchComponent } from "./search/search.component";
import { DataService } from "./_services/DataService.service";
import { CartService } from "./_services/CartService";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { SortingMusicComponent } from "./dataTable/sorting-music/sorting-music.component";
import { SortingMagazinesComponent } from "./dataTable/sorting-magazines/sorting-magazines.component";
import { SortingMoviesComponent } from "./dataTable/sorting-movies/sorting-movies.component";
import { SortingBookComponent } from "./dataTable/sorting-book/sorting-book.component";
import { CustomRouteReuseStategy } from "./_services/route-reuse.service";
import { ObjectDetailsService } from "./_services/object-details.service";
import {ItemContainerComponent} from "./item-details/item-container/item-container.component";
import { UserAuthenticateGuard } from "./_services/guards/user-authenticate.guard";
import { MatBadgeModule } from '@angular/material';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      TestComponent,
      HomePageComponent,
      RegisterComponent,
      LoginComponent,
      ConfirmationComponent,
      RegistrationErrorComponent,
      ActiveUsersSideNavComponent,
      AddItemComponent,
      AddBookComponent,
      AddMusicComponent,
      AddMoviesComponent,
      AddMagazineComponent,
      DataTableComponent,
      DeleteItemComponent,
      ShoppingCartComponent,
      ShoppingCartItemComponent,
      UpdateBookComponent,
      UpdateMagazineComponent,
      UpdateMusicComponent,
      UpdateMovieComponent,
      PromoteUserComponent,
      CheckoutComponent,
      DeleteItemPromptDialogComponent,
      SearchComponent,
      SearchComponent,
      SortingMusicComponent,
      CheckoutComponent,
      SortingMagazinesComponent,
      SortingMoviesComponent,
      SortingBookComponent,
      MusicDetailsComponent,
      MovieDetailsComponent,
      BookDetailsComponent,
      MagazineDetailsComponent,
      ItemContainerComponent
   ],
   imports: [
      MatCheckboxModule,
      BrowserModule,
      BrowserAnimationsModule,
      MatFormFieldModule,
      MatInputModule,
      MatChipsModule,
      MatButtonModule,
      MatToolbarModule,
      MatMenuModule,
      MatBadgeModule,
      MatDialogModule,
      MatCardModule,
      MatSelectModule,
      MatSidenavModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot([]),
      routing,
      ReactiveFormsModule,
      MatListModule,
      MatIconModule,
      MatTableModule,
      MatPaginatorModule,
      MatSnackBarModule,
      MatSortModule,
      MatProgressSpinnerModule,
      MatAutocompleteModule,
      MatProgressBarModule
   ],
   entryComponents: [
      LoginComponent,
      ConfirmationComponent,
      RegistrationErrorComponent,
      DeleteItemPromptDialogComponent,
      CheckoutComponent
   ],
   providers: [
      UserService,
      PasswordService,
      AdminAuthenticateGuard,
      UserAuthenticateGuard,
      ToggleService,
      DataService,
      ObjectDetailsService,
      CartService,
      {provide: RouteReuseStrategy, useClass: CustomRouteReuseStategy}
   ],
   bootstrap: [
      AppComponent
   ],
   exports: [
      MatBadgeModule
   ]
})
export class AppModule { }
