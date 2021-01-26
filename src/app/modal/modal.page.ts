import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() categories: any;
  searchCats = [];
  constructor(public modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.searchCats = this.categories;
    this.searchCats.sort((a, b) => (a.categoryName > b.categoryName) ? 1 : ((b.categoryName > a.categoryName) ? -1 : 0));
  }

  dismiss(category) {
    this.modalCtrl.dismiss({
      // tslint:disable-next-line:object-literal-key-quotes
      'categorySelected': category
    });
  }

  search(value) {
    const regEx = new RegExp(`.*${value}.*`, 'ig');
    this.searchCats = this.categories.filter(cat => cat.categoryName.match(regEx));
  }

}
