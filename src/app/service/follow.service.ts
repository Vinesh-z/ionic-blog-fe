import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AllUrl } from '../baseurl';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FollowService {
  url: AllUrl = new AllUrl();
  constructor(private http: HttpClient) { }

  addFollow(follow: any): Observable<any> {
    return this.http.post<any>(this.url.BASE_URL + `/follow/`, follow);
  }

  isFollowing(follow: any): Observable<any> {
    return this.http.post<any>(this.url.BASE_URL + `/follow/isFollowing`, follow);
  }

  getFollowers(id: string): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/follow/followers/' + id);
  }

  getFollowing(id: string): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/follow/following/' + id);
  }

  followersCount(id: string): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/follow/followersCount/' + id);
  }

  followingCount(id: string): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/follow/followingCount/' + id);
  }

  deleteFollow(id: string): Observable<any> {
    return this.http.delete<any>(this.url.BASE_URL + '/follow/remove/' + id);
  }

}
