import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule , ReactiveFormsModule} from '@angular/forms'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {HttpClientModule} from '@angular/common/http';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { FormComponent } from './form/form.component'

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
