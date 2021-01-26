import { Component, OnInit, Input } from '@angular/core';
import { AllUrl } from 'src/app/baseurl';
import { BlogService } from 'src/app/service/blog.service';
import { Router } from '@angular/router';
import * as readingTime from 'reading-time';
@Component({
  selector: 'app-blog-display',
  templateUrl: './blog-display.component.html',
  styleUrls: ['./blog-display.component.scss'],
})
export class BlogDisplayComponent implements OnInit {
  stats: any;
  constructor(private blogService: BlogService, private router: Router) {
  }
  @Input() blog: any;
  url: AllUrl = new AllUrl();
  ngOnInit() {
    this.stats = readingTime(this.blog.content);
  }

}
