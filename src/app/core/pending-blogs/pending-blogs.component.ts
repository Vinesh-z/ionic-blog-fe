import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import stripHtml from 'string-strip-html';
import * as moment from 'moment';
import { ModblogService } from 'src/app/service/modblog.service';
import { UserDataService } from 'src/app/service/user-data.service';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/service/facade.service';
@Component({
  selector: 'app-pending-blogs',
  templateUrl: './pending-blogs.component.html',
  styleUrls: ['./pending-blogs.component.scss'],
})
export class PendingBlogsComponent implements OnInit {
  userId: string;
  blogs = [];
  // tslint:disable-next-line:max-line-length
  constructor(private facadeService: FacadeService, private router: Router, private location: Location, private modblogService: ModblogService, private userService: UserDataService) { }

  ngOnInit() {
    this.fetchPendingBlogs();
  }

  fetchPendingBlogs() {
    this.facadeService.getUserId().then(userId => {
      this.userId = userId;
      this.modblogService.getByUserId(this.userId).subscribe(blogs => {
        if (blogs.length > 0) {
          blogs.forEach(blog => {
            this.formatBlogData(blog);
          });
        }
      });
    });
  }

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

  blogDetail(blog) {
    this.router.navigate(['/core/pending/', blog._id]);
  }

  goBack() {
    this.location.back();
  }

}
