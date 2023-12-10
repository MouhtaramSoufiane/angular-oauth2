import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service'; // Import the missing AuthServiceService class
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms'; // Import the missing FormGroup class


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  loginFormGroup! : FormGroup;
  
  constructor(private authService : AuthServiceService, private router : Router) {
    this.authService.loadProfile();
  }
  logout() {
    this.authService.logout();

    this.loginFormGroup.reset()
  }

}
