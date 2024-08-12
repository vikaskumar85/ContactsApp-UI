import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewscontactComponent } from './viewscontact/viewscontact.component';
import { FormsModule, ReactiveFormsModule,FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './_compnent/alert.component';

import { PaginationComponent } from './_compnent/pagination/pagination.component'
import { ModalComponent } from './_compnent/_modelpopup/modal.component';
@NgModule({
  declarations: [
    AppComponent,
    ViewscontactComponent,
    AlertComponent,
    PaginationComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
