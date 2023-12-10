import { Injectable } from '@angular/core';
import { UserProfile } from '../modul/user-profile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  public authHost: string =
    'http://localhost:8080/realms/sdia-realm/protocol/openid-connect/token';
  public userProfile: UserProfile | null = null;
  public ts: number = 0;

  
  constructor(private http: HttpClient) { }


  public login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    let params = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password)
      .set('client_id', 'sdia-customer-client')
      .set('client_secret','g3ERM52g498sDokpSBQASmWATk68TZkp');
    return this.http.post(this.authHost, params, options);
  }


  public authenticateUser(idToken: any) {
    let jwtHelperService = new JwtHelperService();
    let accessToken = idToken['access_token'];
    let refreshToken = idToken['refresh_token'];
    let decodedJWTAccessToken = jwtHelperService.decodeToken(accessToken);
    this.userProfile = {
      userId: decodedJWTAccessToken.sub,
      username: decodedJWTAccessToken.preferred_username,
      email: decodedJWTAccessToken.email,
      givenName: decodedJWTAccessToken.given_name,
      familyName: decodedJWTAccessToken.familly_name,
      scope: decodedJWTAccessToken.scope,
      roles: decodedJWTAccessToken.realm_access.roles,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
    console.log(localStorage.getItem('userProfile'))
  }


  public refreshToken(refreshToken: string) {
    console.log(refreshToken);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let params = new HttpParams()
      .set("grant_type", "refresh_token")
      .set("refresh_token", this.userProfile!.refreshToken)
      .set('client_id', 'sdia-customer-client');
    console.log("==========");
    return this.http.post(this.authHost + "?rt", params, options)
  }


  logout() {
    this.userProfile = null;
    localStorage.removeItem("userProfile");
    window.location.href = "/"
  }

  isAuthenticated() {
    return this.userProfile != null;
  }


  loadProfile() {
    let profile = localStorage.getItem("userProfile");
    if (profile == undefined) return;
    let item = JSON.parse(profile);
    this.authenticateUser({ "access_token": item.accessToken, "refresh_token": item.refreshToken });
    console.log(this.userProfile)
  }


  // loadUserProfile() {
  //   return this.http.get<any>(this.authHost + "/user/profile");
  // }


  public hasRole(role: string): boolean {
    if (!this.userProfile) return false;
    return this.userProfile.roles.includes(role);
  }

}
