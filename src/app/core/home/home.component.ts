import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import * as moment from 'moment';
import * as $ from 'jquery';
import { PopoverController, LoadingController, IonInfiniteScroll } from '@ionic/angular';
import { FilterComponent } from 'src/app/popovers/filter/filter.component';
import stripHtml from 'string-strip-html';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  constructor(public loadingController: LoadingController, public popoverController: PopoverController,
    // tslint:disable-next-line:align
    private blogService: BlogService, private router: Router) { }
  blogs: any;
  categorySelect = false;
  blogsCount = 10;
  categoryId: string;
  allBlogs = [];
  singleBlog: any;
  ngOnInit() {
    this.allBlogs = [];
    this.showLoader();
  }

  ionViewDidEnter() {
    this.allBlogs = [];
    this.getAllBlogs();
  }

  loadData(event) {
    if (this.categorySelect) {
      this.blogService.getBlogByCat(this.blogsCount, 10, this.categoryId).subscribe(blogs => {
        this.infiniteScroll.complete();
        if (blogs.length < 10) {
          event.target.disabled = true;
        }
        this.infiniteScroll.disabled = false;
        this.blogsCount = this.blogsCount + 10;
        this.formatBlogData(blogs);
      });
    } else {
      this.blogService.getBlogPagination(this.blogsCount, 10).subscribe(data => {
        this.infiniteScroll.complete();
        if (data.length < 10) {
          event.target.disabled = true;
        }
        this.blogsCount = this.blogsCount + 10;
        this.blogs = data;
        this.formatBlogData(data);
      });
    }
  }

  getAllBlogs() {
    this.allBlogs = [];
    this.blogsCount = 10;
    this.infiniteScroll.disabled = false;
    this.blogService.getBlogPagination(0, 10).subscribe(data => {
      if (data.length >= 1) {
        this.blogs = data;
        this.formatBlogData(data);
      }
    });
  }

  formatBlogData(blogs) {
    for (const element of blogs) {
      this.blogService.getBlog(element._id).subscribe(blog => {
        blog.date = moment(blog.createdAt).date();
        blog.month = moment(blog.createdAt).format('MMM');
        blog.year = moment(blog.createdAt).year();
        blog.content = stripHtml(blog.content);
        blog.authorName = blog.author[0].name.substr(0, 10);
        if (blog.blogName.length > 35) {
          blog.blogName = blog.blogName.substr(0, 35);
          blog.blogName = blog.blogName + '...';
        }
        this.allBlogs.push(blog);
      });
    }
  }

  search(value) {
    this.infiniteScroll.disabled = true;
    if (value.trim()) {
      this.blogService.searchBlog(value).subscribe(blogs => {
        this.allBlogs = [];
        this.formatBlogData(blogs);
      });
    }
  }

  presentPopover(ev: any) {
    this.popoverController.create({
      component: FilterComponent,
      event: ev,
      translucent: true
    }).then(popover => {
      popover.present();
      popover.onWillDismiss().then(data => {
        if (data.data) {
          if (data.data.selected === 'All') {
            this.categorySelect = false;
            this.allBlogs = [];
            this.getAllBlogs();
          } else {
            this.blogsCount = 0;
            this.categoryId = data.data.selected._id;
            this.categorySelect = true;
            this.blogService.getBlogByCat(0, 10, this.categoryId).subscribe(blogs => {
              this.infiniteScroll.disabled = false;
              this.allBlogs = [];
              this.formatBlogData(blogs);
            });
          }
        }
      });
    });
  }

  showLoader() {
    this.loadingController.create({
      spinner: 'crescent',
      duration: 1000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    }).then(loading => {
      return loading.present();
    });
  }

  doRefresh(event) {
    this.allBlogs = [];
    this.getAllBlogs();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  blogDetail(blog) {
    this.router.navigate(['/core/blog/', blog._id]);
  }
}
