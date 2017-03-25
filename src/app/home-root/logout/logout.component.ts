import { Component, OnInit, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  title: "Logout";
  error: string;

  constructor(private _userService: UserService, private _router: Router, @Inject('apiBase') private _apiBase: string) { }

  ngOnInit() {
    this._userService.logout().subscribe(data => {
      this._router.navigateByUrl('/login');
    },
    error => {
      this.error = "Something went wrong";
    });
  }

}