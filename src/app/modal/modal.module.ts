import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { ModalPageRoutingModule } from './modal-routing.module';

import { ModalPage } from './modal.page';
import { AvatarSelectComponent } from './avatar-select/avatar-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageRoutingModule
  ],
  declarations: [ModalPage, AvatarSelectComponent],
  exports: [ AvatarSelectComponent ]
})
export class ModalPageModule {}
