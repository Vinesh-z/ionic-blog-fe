import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AllUrl } from '../baseurl';
import { Observable } from 'rxjs';
import { Cacheable } from 'ngx-cacheable';

const GET_HEADERS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  responseType: 'text' as 'json'
};
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url: AllUrl = new AllUrl();
  constructor(private http: HttpClient) { }

  addComment(comment: any): Observable<any> {
    return this.http.post<any>(this.url.BASE_URL + `/comments/`, comment, GET_HEADERS);
  }


  getAllComments(blogId: string): Observable<any> {

    return this.http.get<any>(this.url.BASE_URL + '/comments/' + blogId);
  }

  nestedComment(comment: any, commentId: string): Observable<any> {

    return this.http.post<any>(this.url.BASE_URL + `/comments/nested/` + commentId, comment, GET_HEADERS);
  }

  updateComment(comment: any, commentId: string): Observable<any> {

    return this.http.put<any>(this.url.BASE_URL + `/comments/` + commentId, comment, GET_HEADERS);
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete<any>(this.url.BASE_URL + '/comments/' + commentId);
  }
}
