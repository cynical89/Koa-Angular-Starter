import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from  '../shared/services/user/user';
import { UserService } from  '../shared/services/user/user.service';

@Component({
    selector: 'home-root',
    templateUrl: './home-root.component.html',
    styleUrls: ['./home-root.component.css']
})

export class HomeRootComponent implements OnInit {
    me: User;
    name: string;
    username: string;
    profile_picture: string;

    constructor(private _userService: UserService, private _router: Router) {

    }

    ngOnInit() {
        this.getMe();
    }

    logout() {
        /**
         * Total hack until new router is used (for authentication and activation logic)
         */
        this._userService.logout().subscribe(
            data => {
                if (!data.loggedOut) this._router.navigate(['/login']);;
            });
    }

    getMe() {
        this._userService.getMe().subscribe(me => {
            this.me = me;
            this.name = this.me.name;
            this.username = this.me.username;
        });
    }

    title = 'Home Root Component';
}