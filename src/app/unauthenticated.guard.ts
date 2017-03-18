import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './shared/services/user/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnauthenticatedGuard implements CanActivate {

  constructor(private _router: Router, private _userService: UserService) {}

  canActivate(): Observable<boolean> | boolean {
    return this._userService.authenticated()
      .map(
        result => {
          console.log(result);
          if (!result.authenticated) {
            return true;
          } else {
            this._router.navigate(['/home']);
            return false;
          }
        }
      ).catch(error => {
        return Observable.of(true);
      });
  }
}
