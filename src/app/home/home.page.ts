import { FormFeild } from './../components/ion-custom-form-builder/form-field-interface';
import { AbstractControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  forgotPasswordForm: FormFeild[] = [];
  email: AbstractControl;
  password: AbstractControl;

  constructor() {
    this.forgotPasswordForm = [
      {
        icon: 'mail',
        type: 'email',
        title: 'Email',
        formControlName: 'email',
        value: this.email,
        validators: [Validators.required]
      },
      {
        icon: 'lock',
        type: 'password',
        title: 'Password',
        formControlName: 'password',
        value: this.email,
        validators: [Validators.required]
      }
    ];
  }

  submitForm(formData) {
    console.log('FORM_DATA=,', formData);
  }
}
