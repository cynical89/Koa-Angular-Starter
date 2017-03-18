import { Injectable, Inject } from '@angular/core';
//import { Control } from '@angular/common';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

/**
 * Import interfaces that service depends on
 */
import { User } from './user';

@Injectable()
export class UserService {
  constructor (private http: Http, @Inject('apiBase') private _apiBase: string) {

  }

  private _loginApi = this._apiBase + '/api/login';
  private _logoutApi = this._apiBase + '/logout';
  private _authenticatedApi = this._apiBase + '/api/authenticated';
  private _registerApi = this._apiBase + '/api/register';
  private _userExistsApi = this._apiBase + '/api/exists';

  login(user) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this._loginApi, body, <RequestOptionsArgs> {headers: headers, withCredentials: true})
                    .map((res: Response) => res)
                    .catch(this.handleError);
  }

  authenticated() {
    return this.http.get(this._authenticatedApi, <RequestOptionsArgs> {withCredentials: true})
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  logout() {
    return this.http.get(this._logoutApi, <RequestOptionsArgs> {withCredentials: true})
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  register(user) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this._registerApi, body, <RequestOptionsArgs> {headers: headers, withCredentials: true})
                    .map((res: Response) => res)
                    .catch(this.handleError);
  }

  getUsers() {
    return this.http.get(this._apiBase + "/api/users?limit=5&desc=true", <RequestOptionsArgs> {withCredentials: true})
                  .map((res: Response) => res.json())
                  .catch(this.handleError);
  }

  getMe() {
    return this.http.get(this._apiBase + '/api/users/me/', <RequestOptionsArgs> {withCredentials: true})
                  .map((res: Response) => res.json().me)
                  .catch(this.handleError);
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error || "Server Error");
  }
}
