import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../model/User';
import { UserDataService } from '../service/user-data.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FacadeService } from '../service/facade.service';
import { AvatarSelectComponent } from '../modal/avatar-select/avatar-select.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registrationForm: FormGroup;
  user: User = new User();
  avatar = 'default.jpg';
  gender = 'male';
  profilePic: any = '../../assets/avatar.jpg';
  constructor(public modalController: ModalController, private facadeService: FacadeService, private router: Router, public toastController: ToastController, private userService: UserDataService) { }

  ngOnInit() {
    this.formControl();
  }

  formControl() {
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      about: new FormControl()
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  genderSelect(value) {
    this.gender = value;
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


  register() {
    this.user = this.registrationForm.value;
    this.user.gender = this.gender;
    this.user.profile = this.avatar;
    this.userService.addUser(this.user).subscribe(data => {
      if (data.message === 'User already exists') {
        this.toast(data.message, 'danger');
      } else {
        this.toast(data.message, 'success');
        this.facadeService.userloggedIn(data.token).then(() => {
          this.facadeService.setUserToken().then(() => {
            this.router.navigateByUrl('home');
          });
        });
      }
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
