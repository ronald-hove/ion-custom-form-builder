import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormField } from './../components/ion-custom-form-builder/form-field-interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  fields: FormField[] = [];

  constructor() {
    this.fields = [
      {
        icon: 'mail',
        type: 'email',
        title: 'Email',
        formControlName: 'email',
        validators: [Validators.required, Validators.email],
        validationMessages: [
          {
            type: 'required',
            message: 'Email is required'
          },
          {
            type: 'email',
            message: 'Email is incorrect'
          }
        ]
      },
      {
        icon: 'lock-closed',
        type: 'text',
        title: 'Password',
        formControlName: 'password',
        validators: [Validators.required],
        validationMessages: [
          {
            type: 'required',
            message: 'Password is required'
          }
        ]
      }
    ];
  }

  submitForm(formData) {
    console.log('FORM_DATA=,', formData);
  }
}
