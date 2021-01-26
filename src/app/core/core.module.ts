import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorePageRoutingModule } from './core-routing.module';

import { CorePage } from './core.page';
import { BlogDisplayComponent } from './blog-display/blog-display.component';
import { HomeComponent } from './home/home.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { PopoverComponent } from '../popovers/popover/popover.component';
import { LikedBlogsComponent } from './liked-blogs/liked-blogs.component';
import { UnitBlogComponent } from './unit-blog/unit-blog.component';
import { PendingBlogsComponent } from './pending-blogs/pending-blogs.component';
import { ViewPendingComponent } from './view-pending/view-pending.component';
import { AuthGuard } from '../guards/auth.guard';
import { ApproveBlogsComponent } from './approve-blogs/approve-blogs.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { QuillModule } from 'ngx-quill';

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
    CorePageRoutingModule
  ],
  providers: [PopoverComponent, AuthGuard],
  declarations: [HomeComponent, BlogDisplayComponent, CorePage, MyBlogsComponent, EditBlogComponent,
    BlogDetailComponent, LikedBlogsComponent, UnitBlogComponent, PendingBlogsComponent, ViewPendingComponent, ApproveBlogsComponent]
})
export class CorePageModule { }
