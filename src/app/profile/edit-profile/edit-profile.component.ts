import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserDataService } from 'src/app/service/user-data.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/model/User';
import { AllUrl } from 'src/app/baseurl';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AvatarSelectComponent } from 'src/app/modal/avatar-select/avatar-select.component';
import { FacadeService } from 'src/app/service/facade.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  user: User = new User();
  avatar = 'default.jpg';
  gender: string;
  url: AllUrl = new AllUrl();
  profilePic: any = '../../assets/avatar.jpg';
  // tslint:disable-next-line:max-line-length
  constructor(private facadeService: FacadeService, private router: Router, private userService: UserDataService, public toastController: ToastController, public modalController: ModalController, private location: Location) { }

  ngOnInit() {
    this.formControl();
    this.facadeService.getUser().then(user => {
      this.user = user;
      if (user.profile !== 'empty') {
        this.avatar = user.profile;
      }
      this.gender = user.gender;
      this.patchValue();
    });
  }
  genderSelect(value) {
    this.gender = value;
  }

  patchValue() {
    this.editProfileForm.patchValue({
      name: this.user.name,
      emailId: this.user.emailId,
      dob: this.user.dob,
      about: this.user.about
    });
  }
  formControl() {
    this.editProfileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      about: new FormControl()
    });
  }


  editProfile() {
    this.user.name = this.editProfileForm.value.name;
    this.user.emailId = this.editProfileForm.value.emailId;
    this.user.gender = this.gender;
    this.user.dob = this.editProfileForm.value.dob;
    this.user.about = this.editProfileForm.value.about;
    this.user.profile = this.avatar;
    this.userService.updateUser(this.user).subscribe(data => {
      this.toast('User updated successfully', 'success');
      this.router.navigate(['home', 'profile']);
    });
  }

  presentModal() {
    this.modalController.create({
      component: AvatarSelectComponent
    }).then(modal => {
      modal.present();
      modal.onWillDismiss().then(data => {
        if (data.data.avatarSelected !== 'null') {
          this.avatar = data.data.avatarSelected;
        }
      });
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

  goBack() {
    this.location.back();
  }


}
