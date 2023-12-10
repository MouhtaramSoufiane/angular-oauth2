import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  customers: any;

  constructor(private http:HttpClient) { }

  getCustomers(): Observable<any> {
    let userProfile = JSON.parse(localStorage.getItem('userProfile') ?? '');
    let jwtToken = userProfile.token;
    console.log(userProfile.accessToken);

    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer `+jwtToken
      ),
    };

    return this.http.get(`http://localhost:8084/products`, options);
  }
}
