import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { USER_STATUS_CODES } from '../shared/services/user/user-status-codes';
import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  title = 'Register';
  loginLink = '/login';

  form: FormGroup;
  submitted: boolean = false;
  error: string;

  constructor(private _userService: UserService, private _router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(64)
        ])
    ],
    username: ['',
      Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(64)
      ])
    ],
    email: ['',
      Validators.compose([
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      ])
    ],
    password: ['',
      Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ])
    ],
    confirmpassword: ['',
      Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ])
    ]
  }, {
    validator: matchingPasswords('password', 'confirmpassword')
  });

  function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  this.form.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged();
  }

  onValueChanged(data?: any) {
  if (!this.form) { return; }
  const form = this.form;
  for (const field in this.formErrors) {
    // clear previous error message (if any)
    console.log(form.get(field));
    this.formErrors[field] = '';
    const control = form.get(field);
    if (control && control.dirty && !control.valid) {
      const messages = this.validationMessages[field];
      for (const key in control.errors) {
        this.formErrors[field] += messages[key] + ' ';
      }
    }
  }
}

formErrors = {
  'name': '',
  'username': '',
  'email': '',
  'password': '',
  'confirmpassword': ''
};

validationMessages = {
    'name': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 4 characters long.',
      'maxlength':     'Name cannot be more than 64 characters long.'
    },
    'username': {
      'required':      'Username is required.',
      'minlength':     'Username must be at least 4 characters long.',
      'maxlength':     'Username cannot be more than 64 characters long.'
    },
    'email': {
      'required':      'Email is required.',
      'pattern':       'Email is not valid.'
    },
    'password': {
      'required':      'Password is required.',
      'minlength':     'Password must be at least 4 characters long.',
      'maxlength':     'Password cannot be more than 32 characters long.',
      'match':         'password matches'
    },
    'confirmpassword': {
      'required':      'Password confirmation is required.',
      'minlength':     'Password confirmation must be at least 4 characters long.',
      'maxlength':     'Password confirmation cannot be more than 32 characters long.'
    }
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
    this.error = null;

    this._userService.register(this.form.value).subscribe(data => {
      this._router.navigateByUrl('/login');
    },
    error => {
      this.submitted = false;
      this.error = USER_STATUS_CODES[error.status] || USER_STATUS_CODES[500];
    });
  }

}
