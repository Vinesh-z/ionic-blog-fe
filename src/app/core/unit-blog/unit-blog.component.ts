import { Component, OnInit, Input } from '@angular/core';
import { AllUrl } from 'src/app/baseurl';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unit-blog',
  templateUrl: './unit-blog.component.html',
  styleUrls: ['./unit-blog.component.scss'],
})
export class UnitBlogComponent implements OnInit {
  colors = [
    '#ba68c8', '#f06292', '#ef5350', '#9575cd', '#7986cb', '#2196f3', '#dce775', '#ffd54f'
  ];
  url: AllUrl = new AllUrl();
  constructor(private router: Router) { }
  @Input() blog: any;
  ngOnInit() {
  }

  authorProfile() {
    this.router.navigateByUrl('profile/user-profile/' + this.blog.author[0].emailId);
  }

}
