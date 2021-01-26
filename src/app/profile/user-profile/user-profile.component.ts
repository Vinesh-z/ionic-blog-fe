import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/service/user-data.service';
import { Location } from '@angular/common';
import { FollowService } from 'src/app/service/follow.service';
import { BlogService } from 'src/app/service/blog.service';
import { Follow } from 'src/app/model/Follow';
import { FacadeService } from 'src/app/service/facade.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  emailId: string;
  user: any;
  author: any;
  userId: string;
  authorId: string;
  followId: string;
  following = false;
  followersCount: any;
  followingCount: any;
  follow: Follow = new Follow();
  postsCount: number;
  // tslint:disable-next-line:max-line-length
  constructor(private facadeService: FacadeService, private blogService: BlogService, private followService: FollowService, private location: Location, private userService: UserDataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // tslint:disable-next-line:no-string-literal
    this.emailId = this.activatedRoute.snapshot.params['emailId'];
    this.getAuthor();
  }

  getUser() {
    this.facadeService.getUser().then(user => {
      this.facadeService.getUserId().then(userId => {
        this.userId = userId;
        this.user = user;
        this.follow.userId = this.userId;
        this.follow.authorId = this.authorId;
        this.followService.isFollowing(this.follow).subscribe(isFollowing => {
          if (isFollowing.length > 0) {
            this.followId = isFollowing[0]._id;
            this.following = true;
          } else {
            this.following = false;
          }
        });
      });
    });
  }

  getAuthor() {
    this.userService.getUser(this.emailId).subscribe(data => {
      this.author = data;
      this.authorId = data._id;
      this.getFollowCounts();
      this.getUser();
    });
  }

  getFollowCounts() {
    this.followService.followersCount(this.authorId).subscribe(data => {
      this.followersCount = data.count;
    });
    this.followService.followingCount(this.authorId).subscribe(data => {
      this.followingCount = data.count;
    });
    this.blogService.userBlogsCount(this.authorId).subscribe(data => {
      this.postsCount = data.count;
    });
  }

  followAuthor() {
    this.following = true;
    this.followService.addFollow(this.follow).subscribe(data => {
      this.followId = data._id;
      this.getAuthor();
    });
  }

  unFollowAuthor() {
    this.following = false;
    this.followService.deleteFollow(this.followId).subscribe(data => {
      this.getAuthor();
    });
  }

  goBack() {
    this.location.back();
  }


}
