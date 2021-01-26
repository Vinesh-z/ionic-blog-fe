import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Blog } from '../model/blog';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { BlogService } from '../service/blog.service';
import { FacadeService } from '../service/facade.service';
import { UserDataService } from '../service/user-data.service';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { ModblogService } from '../service/modblog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.page.html',
  styleUrls: ['./add-blog.page.scss'],
})
export class AddBlogPage implements OnInit {
  data: any;
  Tags = [];
  categories: any;
  fileName = 'Choose';
  formData = new FormData();
  filesToUpload: File;
  chosenCategory = 'Select';
  blog: Blog = new Blog();
  colors = [
    '#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#cddc39', '#ffc107', '#ff5722', '#039be5'
  ];
  blogForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private facadeService: FacadeService, private modblogService: ModblogService, private router: Router, private userService: UserDataService, public modalController: ModalController, public toastController: ToastController, private blogService: BlogService) { }

  ngOnInit() {
    this.getUser();
    this.formControl();
    this.getAllCategories();
  }

  getAllCategories() {
    this.blogService.getAllCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

  getUser() {
    this.facadeService.getUser().then(user => {
      this.blog.author = JSON.parse(user);
    });
  }

  presentModal() {
    this.modalController.create({
      component: ModalPage,
      componentProps: {
        // tslint:disable-next-line:object-literal-key-quotes
        'categories': this.categories,
      }
    }).then(modal => {
      modal.present();
      modal.onWillDismiss().then(data => {
        if (data.data.categorySelected) {
          this.chosenCategory = data.data.categorySelected.categoryName;
          this.blog.categoryId = data.data.categorySelected._id;
        }
      });
    });
  }

  formControl() {
    this.blogForm = new FormGroup({
      blogName: new FormControl('', Validators.required),
      blogContent: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.blogForm.controls;
  }

  addBlog() {
    if (!this.blog.categoryId) {
      this.presentToast('Please select a category.', 'danger');
    } else if (!this.formData.has('file')) {
      this.presentToast('Please add blog cover image.', 'danger');
    } else {
      this.blog.blogName = this.blogForm.value.blogName;
      this.blog.content = this.blogForm.value.blogContent;
      this.blog.tags = this.Tags;
      this.modblogService.addingBlog(this.blog).subscribe(data => {
        const id = JSON.parse(data)._id;
        this.modblogService.addImage(this.formData, id).subscribe(data1 => {
        });
        this.formControl();
        this.Tags = [];
        this.chosenCategory = null;
        this.formData.delete('file');
        this.fileName = null;
        this.filesToUpload = null;
        this.presentToast('Blog has been added successfully', 'success');
        this.router.navigateByUrl('home');
      });
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput.target.files[0];
    this.formData.set('file', this.filesToUpload);
    if (this.filesToUpload) {
      this.fileName = this.filesToUpload.name.substr(0, 7);
    }
  }

  async presentToast(msg, col) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: col
    });
    toast.present();
  }


  inputTags(tagInput) {
    const tag = tagInput.value.trim();
    if (tag !== '' && this.Tags.length <= 10) {
      this.Tags.push(tagInput.value);
      tagInput.value = '';
    }
  }

  removeTags(value) {
    this.Tags.splice(value, 1);
  }

}
