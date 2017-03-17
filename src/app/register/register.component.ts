import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { USER_STATUS_CODES } from '../shared/services/user/user-status-codes';
import { UserService } from '../shared/services/user/user.service';

import { UsernameEmailValidator } from '../shared/services/user/username-email-validator';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  title = 'Register';
  loginLink = '/login';

  form: FormGroup;

  /**
   * Boolean used in telling the UI
   * that the form has been submitted
   * and is awaiting a response
   */
  submitted: boolean = false;

  /**
   * Diagnostic message from received
   * form request error
   */
  errorDiagnostic: string;

  constructor(private _userService: UserService, private _router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    /**
     * Initialize form Controls
     */

    /**
     * Initialize form
     */
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])]
    });

  }

  login() {
    this._router.navigateByUrl(this.loginLink);
  }

  onSubmit() {
    /**
     * Innocent until proven guilty
     * (show nothing until the request completes)
     */
    this.submitted = true;
    this.errorDiagnostic = null;

    this._userService.register(this.form.value).subscribe(data => {
      this._router.navigateByUrl('/login');
    },
    error => {
      this.submitted = false;
      this.errorDiagnostic = USER_STATUS_CODES[error.status] || USER_STATUS_CODES[500];
    });
  }

}
