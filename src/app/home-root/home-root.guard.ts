import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../shared/services/user/user.service';
import { Observable } from 'rxjs/Observable';

import { HomeRootComponent } from './home-root.component';

@Injectable()
export class HomeRootComponentGuard implements CanActivate {

  constructor(private _router: Router, private _userService: UserService) {}

  canActivate(): Observable<boolean> | boolean {
    return this._userService.authenticated()
      .map(
        result => {
          console.log(result);
          if (result.authenticated) {
            return true;
          } else {
            this._router.navigate(['/login']);
            return false;
          }
        }
      ).catch(error => {
        this._router.navigate(['/login']);
        return Observable.of(false);
      });
  }
}
