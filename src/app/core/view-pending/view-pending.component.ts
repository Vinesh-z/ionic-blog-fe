import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModblogService } from 'src/app/service/modblog.service';
import * as moment from 'moment';
import { UserDataService } from 'src/app/service/user-data.service';
import { Location } from '@angular/common';
import { FacadeService } from 'src/app/service/facade.service';
import { AlertController, ToastController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-view-pending',
  templateUrl: './view-pending.component.html',
  styleUrls: ['./view-pending.component.scss'],
})
export class ViewPendingComponent implements OnInit {
  blogId: string;
  blog: any;
  userId: string;
  user: any;
  author: any;
  loaded = false;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private toastController: ToastController, private alertController: AlertController, private facadeService: FacadeService, private location: Location, private activatedRoute: ActivatedRoute, private modBlogService: ModblogService, private userService: UserDataService) { }

  ngOnInit() {
    this.getUser();
    this.getBlog();
  }
  getUser() {
    this.facadeService.getUser().then(user => {
      this.user = JSON.parse(user);
    });
    this.facadeService.getUserId().then(userId => {
      this.userId = userId;
    });
  }
  getBlog() {
    // tslint:disable-next-line:no-string-literal
    this.blogId = this.activatedRoute.snapshot.params['blogId'];
    this.modBlogService.getBlog(this.blogId).subscribe(data => {
      this.blog = data;
      this.blog.createdAt = moment(data.createdAt).format('MMM Do YYYY');
      this.userService.getUser(this.blog.author[0].emailId).subscribe(user => {
        this.blog.author[0] = user;
        this.author = user;
        console.log(this.author._id);
        if (user.profile !== 'empty') {
          this.blog.author.avatar = user.profile;
        }
        this.loaded = true;
      });
    });
  }

  editBlog() {
    this.router.navigateByUrl('core/editBlog/' + this.blogId);
  }

  deleteBlog() {

  }

  approveBlog() {
    this.modBlogService.approveBlog(this.blog).subscribe(data => {
      console.log(data);
      this.location.back();
    });
  }

  rejectBlog() {
    this.rejectionReason();
  }
  goBack() {
    this.location.back();
  }


  textPrompt() {
    this.alertController.create({
      header: 'Reject Blog!',
      inputs: [
        {
          name: 'value',
          type: 'text',
          placeholder: 'Reason for rejection'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if (!data.value.trim()) {
              this.toast('Please enter reason for rejection', 'danger');
              this.textPrompt();
            } else {
              this.blog.reason = data.value;
              this.modBlogService.rejectBlog(this.blog, this.blogId).subscribe(rejected => {
                console.log(rejected);
                this.router.navigateByUrl('core/approve');
              });
            }
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  rejectionReason() {
    this.alertController.create({
      header: 'Radio',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Violent or prohibited content',
          value: 'Violent or prohibited content',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Sexually inappropriate',
          value: 'Sexually inappropriate'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Offensive',
          value: 'Offensive'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Refers to a political issue',
          value: 'Refers to a political issue'
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Other',
          value: 'Other'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if (data === 'Other') {
              this.textPrompt();
            }
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  toast(mes, col) {
    this.toastController.create({
      message: mes,
      position: 'bottom',
      color: col,
      duration: 2000
    }).then(toast => toast.present());
  }

}
