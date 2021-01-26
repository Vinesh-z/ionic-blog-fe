import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FacadeService } from '../service/facade.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private facadeService: FacadeService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // this.facadeService.getUser().then(user => {
    //   if (user) {
    //     if (JSON.parse(user).role === 'moderator') {
    //       console.log(JSON.parse(user).role);
    //       return true;
    //     } else { return false; }
    //   } else { return false; }
    // });
    return true;
  }
}
