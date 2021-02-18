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
  name: AbstractControl;
  expiry: AbstractControl;
  cvv: AbstractControl;

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
        icon: 'person',
        type: 'text',
        title: 'Name on Card',
        formControlName: 'name',
        control: this.name,
        validators: [Validators.required],
        formFieldType: 'inline',
        labelPosition: 'floating'
      },
      {
        icon: 'calendar',
        type: 'number',
        title: 'Card Expiry',
        formControlName: 'expiry',
        control: this.expiry,
        validators: [Validators.required],
        formFieldType: 'inline',
        labelPosition: 'floating'
      },
      {
        icon: 'lock-closed',
        type: 'number',
        title: 'CVV',
        formControlName: 'cvv',
        control: this.cvv,
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
