import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../service/user-data.service';
import { User } from '../model/User';
import { AllUrl } from '../baseurl';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popovers/popover/popover.component';
import { Router } from '@angular/router';
import { FollowService } from '../service/follow.service';
import { BlogService } from '../service/blog.service';
import { FacadeService } from '../service/facade.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  followersCount: any;
  loaded = false;
  followingCount: any;
  postsCount: number;
  userId: string;
  url: AllUrl = new AllUrl();
  // tslint:disable-next-line:max-line-length
  constructor(private facadeService: FacadeService, private blogService: BlogService, private userService: UserDataService, private followService: FollowService, private popoverController: PopoverController, private router: Router) { }

  ngOnInit() {
    // this.getUserDetails();
  }
  ionViewDidEnter() {
    this.getUserDetails();
  }
  getUserDetails() {
    this.facadeService.getUser().then(user => {
      this.user = JSON.parse(user);
    });
    this.facadeService.getUserId().then(userId => {
      this.userId = userId;
      this.getFollowCounts();
    });
  }

  getFollowCounts() {
    this.followService.followersCount(this.userId).subscribe(data => {
      this.followersCount = data.count;
    });
    this.followService.followingCount(this.userId).subscribe(data => {
      this.followingCount = data.count;
    });
    this.blogService.userBlogsCount(this.userId).subscribe(data => {
      this.postsCount = data.count;
      this.loaded = true;
    });
  }

  presentPopover(ev: any) {
    this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
      componentProps: { message: 'Edit Profile' }
    }).then(popover => {
      popover.present();
      popover.onWillDismiss().then(data => {
        if (data.data) {
          if (data.data.selected === 'Edit Profile') {
            this.router.navigateByUrl('profile/edit-profile');
          }
        }
      });
    });
  }
}
