import { AddBookComponent } from "./add-item/add-book/add-book.component";
import { AdminAuthenticateGuard } from "./_services/guards/admin-authenticate.guard";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./registration/register.component";
import { HomePageComponent } from "./homepage/homepage.component";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { TestComponent } from "./test/test.component";
import {
  MatFormFieldModule, MatButtonModule, MatInputModule, MatToolbarModule, MatMenuModule, MatDialogModule,
  MatCardModule, MatSelectModule, MatSnackBarModule, MatPaginatorModule,
} from "@angular/material";
import {MatSidenavModule} from "@angular/material/sidenav";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { routing } from "./app.routing";
import { LoginComponent } from "./login/login.component";
import { ActiveUsersSideNavComponent } from "./active-users-side-nav/active-users-side-nav.component";
import { ConfirmationComponent } from "./registration/confirmation.component";
import { PasswordService } from "./_services/PasswordService";
import { RegistrationErrorComponent } from "./registration/registration_error.component";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import { UserService } from "./_services/user.service";
import { ToggleService } from "./_services/ToggleService";
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { AddItemComponent } from "./add-item/add-item.component";
import { AddMusicComponent } from "./add-item/add-music/add-music.component";
import { AddMoviesComponent } from "./add-item/add-movies/add-movies.component";
import { AddMagazineComponent } from "./add-item/add-magazine/add-magazine.component";
import { DataTableComponent } from "./dataTable/data-table.component";
import { MatTableModule } from "@angular/material/table";
import { UpdateBookComponent } from "./update-item/update-book/update-book.component";
import { UpdateMagazineComponent } from "./update-item/update-magazine/update-magazine.component";
import { UpdateMusicComponent } from "./update-item/update-music/update-music.component";
import { PromoteUserComponent } from "./promote-user/promote-user.component";
import { DeleteItemErrorBoxComponent } from './delete-item-error-box/delete-item-error-box.component';

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
      UpdateBookComponent,
      UpdateMagazineComponent,
      UpdateMusicComponent,
      PromoteUserComponent,
      DeleteItemErrorBoxComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatToolbarModule,
      MatMenuModule,
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
      MatSnackBarModule
   ],
   entryComponents: [
      LoginComponent,
      ConfirmationComponent,
      RegistrationErrorComponent,
      DeleteItemErrorBoxComponent
   ],
   providers: [
      UserService,
      PasswordService,
      AdminAuthenticateGuard,
      ToggleService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
