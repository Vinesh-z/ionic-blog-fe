import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { LikedBlogsComponent } from './liked-blogs/liked-blogs.component';
import { PendingBlogsComponent } from './pending-blogs/pending-blogs.component';
import { ViewPendingComponent } from './view-pending/view-pending.component';
import { AuthGuard } from '../guards/auth.guard';
import { ApproveBlogsComponent } from './approve-blogs/approve-blogs.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'myBlogs',
    component: MyBlogsComponent
  },
  {
    path: 'likedBlogs',
    component: LikedBlogsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'pendingBlogs',
    component: PendingBlogsComponent
  },
  {
    path: 'blog/:blogId',
    component: BlogDetailComponent
  },
  {
    path: 'editBlog/:blogId',
    component: EditBlogComponent
  },
  {
    path: 'pending/:blogId',
    component: ViewPendingComponent
  },
  {
    path: 'approve',
    component: ApproveBlogsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorePageRoutingModule { }
