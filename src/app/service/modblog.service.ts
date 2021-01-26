import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AllUrl } from '../baseurl';
import { Observable } from 'rxjs';

const GET_HEADERS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  responseType: 'text' as 'json'
};
@Injectable({
  providedIn: 'root'
})
export class ModblogService {

  constructor(private http: HttpClient) { }
  url: AllUrl = new AllUrl();

  addingBlog(blog: any): Observable<any> {
    return this.http.post<any>(this.url.BASE_URL + `/modBlog/`, blog, GET_HEADERS);
  }

  approveBlog(blog: any): Observable<any> {
    return this.http.post<any>(this.url.BASE_URL + `/modBlog/approve`, blog, GET_HEADERS);
  }

  addImage(image: any, blogId: string): Observable<any> {
    return this.http.post<any>(this.url.BASE_URL + '/modBlog/image/' + blogId, image);
  }

  getByUserId(userId): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/modBlog/userId/' + userId);
  }

  getBlog(blogId: string): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/modBlog/findBlog/' + blogId);
  }

  getAllBlogs(): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/modBlog/findModBlogs');
  }

  deleteBlog(blogId: string): Observable<any> {
    return this.http.delete<any>(this.url.BASE_URL + '/modBlog/' + blogId);
  }

  rejectBlog(blog: any, blogId: string): Observable<any> {
    return this.http.post<any>(this.url.BASE_URL + '/modBlog/reject/' + blogId, blog, GET_HEADERS);
  }

}
