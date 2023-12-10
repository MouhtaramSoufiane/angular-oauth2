import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { AuthorizationGuard } from './gurads/authorization-guard.guard';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ErrorComponent } from './error/error.component';
import { LoginTemplateComponent } from './login-template/login-template.component';

const routes: Routes = [
  {path : "", redirectTo : "login", pathMatch:"full"},
  {path : "login", component : LoginTemplateComponent},
  {path:'customer',component:CustomersComponent,canActivate :[AuthorizationGuard],data : {roles : ['ADMIN','USER']}},
  {path:'unAuthorized',component:ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
