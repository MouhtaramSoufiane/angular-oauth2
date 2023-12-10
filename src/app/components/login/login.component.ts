import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { AuthServiceService } from 'src/app/services/auth-service.service';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
   loginFormGroup! : FormGroup;
   idToken : any;
   errorMessage :any;
  constructor(private fb : FormBuilder, private authservice : AuthServiceService, private router : Router) {
  }
  ngOnInit() {
    this.loginFormGroup=this.fb.group({
      username : this.fb.control(''),
      password : this.fb.control('')
    });
  }

  handleLogin() {
    this.errorMessage=undefined;
    let username=this.loginFormGroup.value.username;
    let password=this.loginFormGroup.value.password;
    this.authservice.login(username,password).subscribe({
      next: response => {
        this.idToken = response;
        this.authservice.authenticateUser(this.idToken);
        let userProfile = JSON.parse(localStorage.getItem('userProfile') ?? '');
        this.router.navigateByUrl("/customer");
        console.log(userProfile.accessToken);
        
      },
      error :err => {
        this.errorMessage = err.error.errorMessage;
      }
    })
  }
}