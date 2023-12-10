import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customer/customer.component';
import { ProductsComponent } from './components/products/products.component';

import { BrowserAnimationsModule } 
       from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    ProductsComponent,
    LoginComponent,
    ErrorComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule ,
    MatCardModule
  ],
  
  providers: [{provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
