import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./registration/register.component";
import { HomePageComponent } from "./homepage/homepage.component";
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { TestComponent } from "./test/test.component";
import { MatFormFieldModule, MatButtonModule, MatInputModule, MatToolbarModule, MatMenuModule, MatDialogModule,
MatCardModule} from "@angular/material";
import {MatSidenavModule} from '@angular/material/sidenav';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { routing } from './app.routing';
import { LoginComponent } from './login/login.component';
import { ActiveUsersSideNavComponent } from './active-users-side-nav/active-users-side-nav.component';
import { ConfirmationComponent } from "./registration/confirmation.component";
import { PasswordService } from "./_services/PasswordService";
import { RegistrationErrorComponent } from "./registration/registration_error.component";
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { UserService } from "./_services/user.service";
import { CreateBookComponent } from './catalog/create-book/create-book.component';
import { BookListComponent } from './catalog/book-list/book-list.component';
import { BookDetailsComponent } from './catalog/book-details/book-details.component';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      TestComponent,
      HomePageComponent,
      RegisterComponent,
      LoginComponent,
      ActiveUsersSideNavComponent,
      ConfirmationComponent,
      RegistrationErrorComponent,
      CreateBookComponent,
      BookListComponent,
      BookDetailsComponent
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
      MatSidenavModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot([]),
      routing,
      ReactiveFormsModule,
      MatListModule,
      MatIconModule
   ],
   entryComponents: [
     LoginComponent,
     ActiveUsersSideNavComponent,
     ConfirmationComponent,
     RegistrationErrorComponent
   ],
   providers: [
    UserService, 
    PasswordService, 
   ],
   bootstrap: [
      AppComponent,
      ActiveUsersSideNavComponent
   ]
})
export class AppModule { }
