import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  categories: any;
  constructor(private blogService: BlogService, private popoverController: PopoverController) { }

  ngOnInit() {
    this.blogService.getAllCategories().subscribe(data => {
      this.categories = data;
      this.categories.sort((a, b) => (a.categoryName > b.categoryName) ? 1 : ((b.categoryName > a.categoryName) ? -1 : 0));
    });
  }

  dismiss(data) {
    if (data) {
      this.popoverController.dismiss({
        // tslint:disable-next-line:object-literal-key-quotes
        'selected': data
      });
    }
  }

}
