import { FormField } from './../components/ion-custom-form-builder/form-field-interface';
import { AbstractControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  fields: FormField[] = [];
  card: AbstractControl;
  password: AbstractControl;

  constructor() {
    this.fields = [
      {
        type: 'number',
        title: 'Card Number',
        formControlName: 'card',
        control: this.card,
        validators: [Validators.required],
        formFieldType: 'card',
        labelPosition: 'floating'
      },
      {
        icon: 'lock',
        type: 'password',
        title: ' Password',
        formControlName: 'password',
        control: this.password,
        validators: [Validators.required],
        formFieldType: 'inline',
        labelPosition: 'floating'
      }
    ];
  }

  submitForm(formData) {
    console.log('FORM_DATA=,', formData);
  }
}
