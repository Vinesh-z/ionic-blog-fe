import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { FacadeService } from '../service/facade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {


  constructor(private facadeService: FacadeService, private router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.facadeService.userLoggedOut();
    this.router.navigateByUrl('login');
  }
}
