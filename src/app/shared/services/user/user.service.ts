import { Injectable, Inject } from '@angular/core';
//import { Control } from '@angular/common';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

/**
 * Import interfaces that service depends on
 */
import { User } from './user';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserService {
  constructor (private http: Http, @Inject('apiBase') private _apiBase: string) {

  }

  private _loginApi = environment.production ? 'api/login' : this._apiBase + '/api/login';
  private _logoutApi = environment.production ? 'logout' : this._apiBase + '/logout';
  private _authenticatedApi = environment.production ? '/api/authenticated' : this._apiBase + '/api/authenticated';
  private _registerApi = environment.production ? 'api/register' : this._apiBase + '/api/register';
  private _userExistsApi = environment.production ? 'api/exists' : this._apiBase + '/api/exists';

  login(user) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this._loginApi, body)
                    .map((res: Response) => res)
                    .catch(this.handleError);
  }

  authenticated() {
    return this.http.get(this._authenticatedApi)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  logout() {
    return this.http.get(this._logoutApi)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  register(user) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this._registerApi, body)
                    .map((res: Response) => res)
                    .catch(this.handleError);
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error || "Server Error");
  }
}
