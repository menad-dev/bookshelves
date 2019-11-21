import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: []
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  errorMessage: string;
  iconSuccess: boolean;
  iconFailed: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;

    this.authService.signInUser(email, password).then(
      () => {
        this.iconSuccess = false;
        this.iconFailed = true;
        setTimeout(
          () => {
            this.router.navigate(['/books']);
          }, 1000
        );
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInForm.value));
      },
      (error) => {
        this.iconSuccess = true;
        this.iconFailed = false;
        setTimeout(
          () => {
            this.errorMessage = error;
          }, 1500
        );
      }
    );
  }
}
