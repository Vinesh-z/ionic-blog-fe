import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Storage } from '@ionic/storage';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {
  user: any;
  userId: string;
  token: string;
  loggedIn = false;
  constructor(private userService: UserDataService, private storage: Storage) { }

  async setUserToken() {
    this.token = await this.storage.get('token');
  }

  getUserToken() {
    return this.token;
  }

  async userloggedIn(token: string) {
    await this.storage.set('token', token);
    this.storage.set('loggedIn', JSON.stringify(true));
  }

  setUser() {
    this.userService.getUserFromToken().subscribe(data => {
      this.userService.getUser(data.emailId).subscribe(user => {
        this.storage.set('userId', user._id);
        this.storage.set('user', JSON.stringify(user));
      });
    });
  }

  async getUser() {
    return await this.storage.get('user');
  }

  async getUserId() {
    return await this.storage.get('userId');
  }

  userLoggedOut() {
    this.storage.set('token', JSON.stringify(null));
    this.token = null;
    this.storage.set('loggedIn', JSON.stringify(false));
    this.storage.set('user', JSON.stringify(null));
    this.storage.set('userId', JSON.stringify(null));
  }
}
