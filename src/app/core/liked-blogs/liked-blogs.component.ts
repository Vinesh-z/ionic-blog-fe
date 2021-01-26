import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { UserDataService } from 'src/app/service/user-data.service';
import stripHtml from 'string-strip-html';
import * as moment from 'moment';
import { IonInfiniteScroll } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { FacadeService } from 'src/app/service/facade.service';
@Component({
  selector: 'app-liked-blogs',
  templateUrl: './liked-blogs.component.html',
  styleUrls: ['./liked-blogs.component.scss'],
})
export class LikedBlogsComponent implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  token: string;
  blogs = [];
  userId: string;
  blogsCount = 10;
  // tslint:disable-next-line:max-line-length
  constructor(private facadeService: FacadeService, private router: Router, private location: Location, private blogService: BlogService, private userService: UserDataService) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.facadeService.getUserId().then(userId => {
      this.userId = userId;
      this.blogService.likedBlogs(0, 10, this.userId).subscribe(blogs => {
        if (blogs.length > 0) {
          blogs.forEach(blog => {
            this.blogService.getBlog(blog.blogId).subscribe(uniqueBlog => {
              this.formatBlogData(uniqueBlog);
            });
          });
        }
      });
    });
  }
  loadData(event) {
    this.blogService.likedBlogs(this.blogsCount, 10, this.userId).subscribe(blogs => {
      this.infiniteScroll.complete();
      if (blogs.length < 10) {
        event.target.disabled = true;
      }
      this.blogsCount = this.blogsCount + 10;
      if (blogs.length > 0) {
        for (const blog of blogs) {
          this.formatBlogData(blog);
        }
      }
    });
  }

  // tslint:disable-next-line:no-shadowed-variable
  formatBlogData(element) {
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
