import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog.service';
import { AllUrl } from 'src/app/baseurl';
import { Blog } from 'src/app/model/blog';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CommentService } from 'src/app/service/comment.service';
import { Comment } from 'src/app/model/Comment';
import { PopoverController, AlertController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/popovers/popover/popover.component';
import { UserDataService } from 'src/app/service/user-data.service';
import { User } from 'src/app/model/User';
import * as moment from 'moment';
import { Likes } from 'src/app/model/Likes';
import { FacadeService } from 'src/app/service/facade.service';
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})

export class BlogDetailComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private facadeService: FacadeService, private commentService: CommentService, private activatedRoute: ActivatedRoute, private location: Location, public alertController: AlertController, private router: Router, public popoverController: PopoverController, private blogService: BlogService, private userService: UserDataService) { }
  blogId: string;
  toggle: Array<boolean>;
  url: AllUrl = new AllUrl();
  avatar = 'default.jpg';
  blog: any;
  user: User = new User();
  userId: string;
  comment: Comment = new Comment();
  comments = [];
  loaded = false;
  liked = false;
  likeId: string;
  likesCount: number;
  blogCreated: any;
  commentForm: FormGroup;
  popoverMessage: string;
  commentReplyForm: FormGroup;
  contentElement: any;
  scrolled = false;
  ngOnInit() {
    this.commentFormControl();
    this.getBlog();
    this.getComments();
  }
  logScrolling(value) {
    if (value.detail.scrollTop > 1000) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
    this.contentElement = value.srcElement;
  }
  backToTop() {
    this.contentElement.scrollToTop(1000);
  }
  getUser() {
    this.facadeService.getUser().then(user => {
      this.user = JSON.parse(user);
    });
    this.facadeService.getUserId().then(userId => {
      this.userId = userId;
      if (this.blog.author[0]._id === this.userId) {
        this.popoverMessage = 'Delete';
      } else { this.popoverMessage = 'Report'; }
      this.findLike();
    });
  }

  getBlog() {
    // tslint:disable-next-line:no-string-literal
    this.blogId = this.activatedRoute.snapshot.params['blogId'];
    this.blogService.getBlog(this.blogId).subscribe(data => {
      this.blog = data;
      this.likesCount = this.blog.likesCount;
      this.blog.createdAt = moment(data.createdAt).format('MMM Do YYYY');
      this.userService.getUser(this.blog.author[0].emailId).subscribe(user => {
        this.getUser();
        this.blog.author[0] = user;
        if (user.profile !== 'empty') {
          this.blog.author.avatar = user.profile;
        }
        this.loaded = true;
      });

    });
  }

  findLike() {
    const like = new Likes();
    like.blogId = this.blogId;
    like.userId = this.userId;
    this.blogService.findLike(like).subscribe(data => {
      if (data.length > 0) {
        this.liked = true;
        this.likeId = data[0]._id;
      }
    });
  }

  getComments() {
    this.commentService.getAllComments(this.blogId).subscribe(data => {
      this.comments = data;
      this.toggle = new Array<boolean>(this.comments.length);
      this.toggle.fill(false);
      this.comments.forEach(com => {
        com.date = moment(com.createdAt).format('MMM Do YYYY');
      });
    });
  }

  get f() {
    return this.commentForm.controls;
  }

  get c() {
    return this.commentReplyForm.controls;
  }

  presentPopover(ev: any) {
    this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
      componentProps: { message: this.popoverMessage }
    }).then(popover => {
      popover.present();
      popover.onWillDismiss().then(data => {
        if (data.data) {
          if (data.data.selected === 'Delete') {
            this.deleteBlog();
          }
        }
      });
    });
  }

  commentFormControl() {
    this.commentForm = new FormGroup({
      blogcomment: new FormControl('', Validators.required)
    });
    this.commentReplyForm = new FormGroup({
      blogreplycomment: new FormControl('', Validators.required)
    });
  }

  addComment() {
    if (this.commentForm.value.blogcomment.trim()) {
      this.comment.author = this.user;
      this.comment.blogId = this.blogId;
      this.comment.content = this.commentForm.value.blogcomment.trim();
      this.commentService.addComment(this.comment).subscribe(data => {
        this.getComments();
      });
      this.commentFormControl();
    }
  }

  addReplyComment(value) {
    this.comment.author = this.user;
    this.comment.content = this.commentReplyForm.value.blogreplycomment;
    this.commentService.nestedComment(this.comment, value).subscribe(data => {
      this.getComments();
    });
  }

  deleteComment(data) {
    this.alertController.create({
      header: 'Confirm!',
      message: 'Sure you want to delete the comment?',
      animated: true,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => { }
        }, {
          text: 'Delete',
          handler: () => {
            this.commentService.deleteComment(data._id).subscribe(deletedComment => {
              this.getComments();
            });
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }



  deleteBlog() {
    this.alertController.create({
      header: 'Confirm!',
      message: 'Sure you want to delete the blog?',
      animated: true,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => { }
        }, {
          text: 'Delete',
          handler: () => {
            this.blogService.deleteBlog(this.blogId).subscribe(data => {
              this.router.navigateByUrl('home');
            });
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  deleteReplyComment(comment, subComment) {
    this.alertController.create({
      header: 'Confirm!',
      message: 'Sure you want to delete the comment?',
      animated: true,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => { }
        }, {
          text: 'Delete',
          handler: () => {
            comment.subComments = comment.subComments.filter(subcom => subcom !== subComment);
            this.commentService.updateComment(comment, comment._id).subscribe(data => {
              this.getComments();
            });
          }
        }
      ]
    }).then(alert => {
      alert.present();
    });
  }

  likeBlog() {
    const like = new Likes();
    like.blogId = this.blogId;
    like.userId = this.userId;
    this.blogService.likeBlog(like).subscribe(data => {
      this.findLike();
      this.likesCount = data.likesCount;
      this.liked = true;
    });
  }

  dislikeBlog() {
    this.liked = false;
    this.blogService.dislikeBlog(this.likeId).subscribe(data => {
      this.likesCount = data.likesCount;
    });
  }

  goBack() {
    this.location.back();
  }

}
