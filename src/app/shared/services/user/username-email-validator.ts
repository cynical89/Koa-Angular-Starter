import { Http, HTTP_PROVIDERS, Response } from '@angular/http';
import { ReflectiveInjector } from '@angular/core'
import { Control } from '@angular/common';
import { Observable } from 'rxjs/Rx';

/**
 * The point of this function and file is to act as
 * an asynchronous username and email validator used
 * in the following fashion:
 *
 * new Control('', SyncValidator, AsyncValidator) where
 * Async Validator is the public static method of the class
 * in this file. This file is currently not in use since
 * debounceTime on asynchronous validators doesn't seem to
 * work properly right now . Ssee https://github.com/angular/angular/issues/6895#issuecomment-221765955)
 * which explains the problems me and @babeal ran into when
 * debouncing and asynchronous control validator.
 */

function checkUser(field: string, control: Control): Observable<any> {
  // Return an observable with null if the
  // username or email doesn't yet exist, or
  // an object with the rejection reason if they do

  let injector = ReflectiveInjector.resolveAndCreate([HTTP_PROVIDERS]);
  let http = injector.get(Http);

  return new Observable((obs: any) => {
    control
      .valueChanges
      .debounceTime(300)
      .flatMap(value => http.get("/api/users/exists?field=" + field + "&value=" + control.value).map((res: Response) => res.json()))
      .subscribe(
        data => {
          obs.next(null);
          obs.complete();
        },
        error => {
          let message = error.json().message;
          let reason;
          if (message === 'Username taken') {
            reason = 'usernameTaken';
          }
          if (message === 'Email taken') {
            reason = 'emailTaken';
          }
          obs.next({ [reason]: true });
          obs.complete();
        }
    );
  });
}

export class UsernameEmailValidator {

  constructor() {}

  /**
   * Public control validators
   */
  static checkUsername(control: Control) {
    return checkUser('username', control);
  }

  static checkEmail(control: Control) {
    return checkUser('email', control);
  }
}
