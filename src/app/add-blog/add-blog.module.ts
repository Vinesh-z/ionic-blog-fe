import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBlogPageRoutingModule } from './add-blog-routing.module';

import { AddBlogPage } from './add-blog.page';
import { QuillModule } from 'ngx-quill';
import { ModalPageModule } from '../modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    QuillModule.forRoot({
      modules: {
        syntax: true
      }
    }),
    AddBlogPageRoutingModule
  ],
  declarations: [AddBlogPage]
})
export class AddBlogPageModule {}
