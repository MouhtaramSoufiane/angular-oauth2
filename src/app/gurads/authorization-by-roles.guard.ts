import { ActivatedRouteSnapshot, CanActivateChildFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { Observable } from 'rxjs';
import { RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

class PermissionRoles{
  constructor(private router:Router,private authService:AuthServiceService){

  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.isAuthenticated()){
    this.router.navigateByUrl("/login");
    return false;
    } else {
    let routeRoles=route.data['roles'];
    if(routeRoles=="*") return true;
    let authorized:boolean=false;
    for (let role of routeRoles){
    let hasRole:boolean=this.authService.hasRole(role);
    if(hasRole){
    authorized=true;
    break;
    }
    }
    if(authorized==false) alert("Not Authorized");
    return authorized;
    }
}
}

export const authorizationByRolesGuard: CanActivateChildFn = (childRoute, state) => {
  return inject(PermissionRoles).canActivateChild(childRoute,state);
};

