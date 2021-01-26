import { Component, OnInit } from '@angular/core';
import { ModblogService } from 'src/app/service/modblog.service';
import stripHtml from 'string-strip-html';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-approve-blogs',
  templateUrl: './approve-blogs.component.html',
  styleUrls: ['./approve-blogs.component.scss'],
})
export class ApproveBlogsComponent implements OnInit {
  blogs = [];
  constructor(private router: Router, private location: Location, private modblogService: ModblogService) { }

  ngOnInit() {
    this.getBlogs();
  }
  getBlogs() {
    this.modblogService.getAllBlogs().subscribe(blogs => {
      this.formatBlogData(blogs);
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

  blogDetail(blog) {
    this.router.navigate(['/core/pending/', blog._id]);
  }

  goBack() {
    this.location.back();
  }
}
