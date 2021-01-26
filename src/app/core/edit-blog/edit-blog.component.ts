import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModblogService } from 'src/app/service/modblog.service';
import { FacadeService } from 'src/app/service/facade.service';
import { UserDataService } from 'src/app/service/user-data.service';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalPage } from 'src/app/modal/modal.page';
import { BlogService } from 'src/app/service/blog.service';
import { Blog } from 'src/app/model/blog';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AllUrl } from 'src/app/baseurl';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss'],
})
export class EditBlogComponent implements OnInit {
  data: any;
  Tags = [];
  imageUrl: any;
  url: AllUrl = new AllUrl();
  blogId: string;
  categories: any;
  fileName = 'Change';
  formData = new FormData();
  filesToUpload: File;
  chosenCategory = 'Select';
  blog: Blog = new Blog();
  colors = [
    '#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#cddc39', '#ffc107', '#ff5722', '#039be5'
  ];
  blogForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private location: Location, private activatedRoute: ActivatedRoute, private facadeService: FacadeService, private modBlogService: ModblogService, private router: Router, private userService: UserDataService, public modalController: ModalController, public toastController: ToastController, private blogService: BlogService) { }

  ngOnInit() {
    this.getBlog();
    this.formControl();
  }

  getBlog() {
    // tslint:disable-next-line:no-string-literal
    this.blogId = this.activatedRoute.snapshot.params['blogId'];
    this.modBlogService.getBlog(this.blogId).subscribe(data => {
      this.blog = data;
      this.Tags = this.blog.tags;
      this.imageUrl = this.url.BASE_URL + this.blog.imageUrl[0];
      this.patchValue();
      this.getAllCategories();
    });
  }

  patchValue() {
    this.blogForm.patchValue({
      blogName: this.blog.blogName,
      blogContent: this.blog.content
    });
  }

  getAllCategories() {
    this.blogService.getAllCategories().subscribe(cats => {
      this.categories = cats;
      this.chosenCategory = cats.filter(cat => cat._id === this.blog.categoryId)[0].categoryName;
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
      this.modBlogService.addingBlog(this.blog).subscribe(data => {
        const id = JSON.parse(data)._id;
        this.modBlogService.addImage(this.formData, id).subscribe(data1 => {
        });
        this.formControl();
        this.Tags = [];
        this.chosenCategory = null;
        this.formData.delete('file');
        this.fileName = null;
        this.filesToUpload = null;
        this.presentToast('Blog has been edited successfully', 'success');
        this.router.navigateByUrl('home');
      });
    }
  }


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput.target.files[0];
    this.formData.set('file', this.filesToUpload);
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event) => {
      this.imageUrl = reader.result;
    };
    console.log(fileInput.target.files[0]);
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

  goBack() {
    this.location.back();
  }
}
