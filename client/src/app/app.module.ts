import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { TestComponent } from "../test/test.component";
import {MatFormFieldModule, MatButtonModule, MatInputModule, MatToolbarModule, MatMenuModule, MatDialogModule} from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { HeaderComponent} from "./header/header.component";
import { LoginComponent } from './login/login.component';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      TestComponent,
      LoginComponent
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
      HttpClientModule,
      FormsModule
   ],
   entryComponents: [
     LoginComponent
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
