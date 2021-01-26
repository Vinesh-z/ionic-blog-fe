import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../model/User';
import { UserDataService } from '../service/user-data.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FacadeService } from '../service/facade.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, public toastController: ToastController,
    private userService: UserDataService, public facadeService: FacadeService, private googlePlus: GooglePlus) { }

  loginForm: FormGroup;
  user: User = new User();
  ngOnInit() {
    this.formControl();
  }

  ionViewDidEnter() {
    this.facadeService.userLoggedOut();
  }

  formControl() {
    this.loginForm = new FormGroup({
      emailId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.user = this.loginForm.value;

    this.userService.login(this.user).subscribe(data => {
      if (data.status === '200') {
        this.toast(data.message, 'success');
        this.facadeService.userloggedIn(data.token).then(() => {
          this.facadeService.setUserToken().then(() => {
            this.facadeService.setUser();
            this.router.navigateByUrl('home');
          });
        });
      } else {
        this.toast(data.message, 'danger');
      }
    });
  }

  googleLogin() {
    this.googlePlus.login({})
      .then(res => console.log(res))
      .catch(err => console.error(err));
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
