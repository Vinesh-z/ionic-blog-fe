import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '',
      icon: 'home'
    },
    {
      title: 'My Blogs',
      url: 'core/myBlogs',
      icon: 'albums'
    },
    {
      title: 'Liked Blogs',
      url: 'core/likedBlogs',
      icon: 'heart'
    },
    {
      title: 'My Pending Blogs',
      url: 'core/pendingBlogs',
      icon: 'time'
    },
    {
      title: 'Approve Blogs',
      url: 'core/approve',
      icon: 'checkmark-circle'
    },
    {
      title: 'Logout',
      url: 'logout',
      icon: 'person'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
