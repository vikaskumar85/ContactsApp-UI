import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewscontactComponent } from './viewscontact/viewscontact.component';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './_compnent/alert.component';

import { PaginationComponent } from './_compnent/pagination/pagination.component'
import { AddEditComponent } from './add-edit/add-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    ViewscontactComponent,
    AlertComponent,
    PaginationComponent,
    AddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
