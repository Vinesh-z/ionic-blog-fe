import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { UserDataService } from 'src/app/service/user-data.service';
import stripHtml from 'string-strip-html';
import * as moment from 'moment';
import { IonInfiniteScroll } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/service/facade.service';
@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.scss'],
})
export class MyBlogsComponent implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  token: string;
  userId: string;
  blogs = [];
  blogsCount = 10;
  // tslint:disable-next-line:max-line-length
  constructor(private facadeService: FacadeService, private router: Router, private location: Location, private blogService: BlogService, private userService: UserDataService) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.facadeService.getUserId().then(userId => {
      this.userId = userId;
      this.blogService.getByUserId(0, 10, this.userId).subscribe(blogs => {
        this.formatBlogData(blogs);
      });
    });
  }
  loadData(event) {
    this.blogService.getByUserId(this.blogsCount, 10, this.userId).subscribe(data => {
      this.infiniteScroll.complete();
      if (data.length < 10) {
        event.target.disabled = true;
      }
      this.blogsCount = this.blogsCount + 10;
      this.formatBlogData(data);
    });
  }

  formatBlogData(blogs) {
    for (const element of blogs) {
      element.date = moment(element.createdAt).date();
      element.month = moment(element.createdAt).format('MMM');
      element.year = moment(element.createdAt).year();
      element.content = stripHtml(element.content);
      element.authorName = element.author[0].name.substr(0, 10);
      if (element.blogName.length > 35) {
        element.blogName = element.blogName.substr(0, 35);
        element.blogName = element.blogName + '...';
      }
      this.blogs.push(element);
    }
  }

  doRefresh(event) {
    this.blogs = [];
    this.getBlogs();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  blogDetail(blog) {
    this.router.navigate(['/core/blog/', blog._id]);
  }

  goBack() {
    this.location.back();
  }

}
