import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-avatar-select',
  templateUrl: './avatar-select.component.html',
  styleUrls: ['./avatar-select.component.scss'],
})
export class AvatarSelectComponent implements OnInit {
  avatars = ['default.jpg','man1.png', 'man2.png', 'man3.png', 'man4.png', 'man5.png', 'man6.png', 'man7.png', 'woman1.png', 'woman2.png', 'woman3.png', 'woman4.png',]
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() { }

  dismiss(avatar) {
    this.modalCtrl.dismiss({
      // tslint:disable-next-line:object-literal-key-quotes
      'avatarSelected': avatar
    });
  }
}
