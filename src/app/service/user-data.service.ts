import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllUrl } from '../baseurl';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  url: AllUrl = new AllUrl();
  constructor(private http: HttpClient) { }

  addUser(newUser: User): Observable<any> {

    return this.http.post<any>(this.url.BASE_URL + `/user/`, newUser);
  }

  login(user: User): Observable<any> {

    return this.http.post<any>(this.url.BASE_URL + `/user/login`, user);
  }
  @Cacheable()
  getUser(emailId: string): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/user/byId/' + emailId);
  }

  getUserFromToken(): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/user/token');
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(this.url.BASE_URL + '/user/' + userId);
  }

  updateUser(user: User): Observable<any> {

    return this.http.put<any>(this.url.BASE_URL + `/user/`, user);
  }

  googleLogin(user: any): Observable<any> {

    return this.http.post<any>(this.url.BASE_URL + `/user/google`, user);
  }

  addImage(emailId: string, image: any): Observable<any> {

    return this.http.post<any>(this.url.BASE_URL + '/user/profile/' + emailId, image);
  }


}
