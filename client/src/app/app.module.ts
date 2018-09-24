import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { TestComponent } from "./test/test.component";
import { RegisterComponent } from "./registration/register.component";
import { HomePageComponent } from "./homepage/homepage.component";
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { MatFormFieldModule, MatButtonModule, MatInputModule} from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { routing } from './app.routing';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      TestComponent,
      HomePageComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot([]),
      routing,
      ReactiveFormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
