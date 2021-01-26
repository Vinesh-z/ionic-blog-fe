import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AllUrl } from '../baseurl';
import { Observable } from 'rxjs';
import { Likes } from '../model/Likes';
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
export class BlogService {


  constructor(private http: HttpClient) { }

  url: AllUrl = new AllUrl();

  addingBlog(blog: any): Observable<any> {

    return this.http.post<any>(this.url.BASE_URL + `/blog/`, blog, GET_HEADERS);
  }

  @Cacheable()
  getAllCategories(): Observable<any> {

    return this.http.get<any>(this.url.BASE_URL + `/category/`);
  }

  getAllBlogs(): Observable<any> {

    return this.http.get<any>(this.url.BASE_URL + `/blog/`);
  }
  addImage(image: any, blogId: string): Observable<any> {

    return this.http.post<any>(this.url.BASE_URL + '/blog/image/' + blogId, image);
  }

  @Cacheable()
  getBlog(blogId: string): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/blog/search/' + blogId);
  }

  @Cacheable()
  getBlogByCat(first: number, second: number, catId: string): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/blog/byCat/' + first + '/' + second + '/' + catId);
  }

  @Cacheable()
  searchBlog(keyword: string): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/blog/find/' + keyword);
  }
  @Cacheable({
    maxAge: 50000
  })
  getBlogPagination(first: number, second: number): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/blog/fetch/' + first + '/' + second);
  }

  getByUserId(first: number, second: number, userId): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/blog/userId/' + first + '/' + second + '/' + userId);
  }

  likeBlog(like: Likes): Observable<any> {
    return this.http.post<any>(this.url.BASE_URL + '/blog/like', like);
  }

  dislikeBlog(id: string): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/blog/dislike/' + id);
  }

  findLike(like: Likes): Observable<any> {
    return this.http.post<any>(this.url.BASE_URL + '/blog/findLike', like);
  }

  likedBlogs(first: number, second: number, userId): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/blog/likedBlogs/' + first + '/' + second + '/' + userId);
  }

  deleteBlog(blogId: string): Observable<any> {
    return this.http.delete<any>(this.url.BASE_URL + '/blog/' + blogId);
  }

  userBlogsCount(id: string): Observable<any> {
    return this.http.get<any>(this.url.BASE_URL + '/blog/count/' + id);
  }
}
