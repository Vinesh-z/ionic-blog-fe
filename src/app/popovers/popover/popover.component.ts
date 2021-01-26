import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  message: any;
  constructor(private popoverController: PopoverController, navParams: NavParams) {
    this.message = navParams.get('message');
  }

  ngOnInit() { }

  dismiss(data) {
    this.popoverController.dismiss({
      // tslint:disable-next-line:object-literal-key-quotes
      'selected': data
    });
  }

}
