import { Component } from '@angular/core';
import { Validators, AbstractControl } from '@angular/forms';

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
        asyncValidators: [this.passwordValidator],
        validationMessages: [
          {
            type: 'required',
            message: 'Password is required'
          },
          {
            type: 'passwordValidator',
            message: 'Passwords do not match'
          }
        ],
      },
      {
        icon: 'lock-closed',
        type: 'text',
        title: 'Confirm Password',
        formControlName: 'confirm-password',
        validators: [Validators.required],
        asyncValidators: [this.confirmPasswordValidator],
        validationMessages: [
          {
            type: 'required',
            message: 'Please confirm your password'
          },
          {
            type: 'confirmPasswordValidator',
            message: 'Passwords do not match'
          }
        ]
      },
      {
          type: 'number',
          title: 'Card',
          formControlName: 'card',
          formFieldType: 'credit-card',
          validators: [Validators.required],
          validationMessages: [
            {
              type: 'required',
              message: 'Credit card number is required'
            }
          ]
        }
    ];
  }

  /**
   * Validates password against password confirmation
   *
   * @param {AbstractControl} control
   * @return {*}  {Promise<any>}
   * @memberof HomePage
   */
  passwordValidator(control: AbstractControl): Promise<any> {
    if (!control.parent) {
      return Promise.resolve(null)
    }else if (control?.parent.get('confirm-password')?.value && control?.value !== control?.parent.get('confirm-password')?.value) {
      control.markAsTouched({ onlySelf: true });
      return Promise.resolve({ passwordValidator: { valid: false } });
    }else {
      if (control?.parent.get('confirm-password')?.invalid) {
        control?.parent.get('confirm-password')?.updateValueAndValidity({ onlySelf: true });
      }
      return Promise.resolve(null)
    }
  }


  /**
   * validates password confirmation against password
   *
   * @param {AbstractControl} control
   * @return {*}  {Promise<any>}
   * @memberof HomePage
   */
  confirmPasswordValidator(control: AbstractControl): Promise<any> {
    if (!control.parent) {
      return Promise.resolve(null)
    }else if (control?.parent.get('password')?.value && control?.value !== control?.parent.get('password')?.value) {
      control?.parent.get('password')?.updateValueAndValidity({ onlySelf: true });
      return Promise.resolve({ confirmPasswordValidator: { valid: false } });
    }else {
      control?.parent.get('password')?.updateValueAndValidity({ onlySelf: true });
      return Promise.resolve(null)
    }
  }

  submitForm(formData) {
    console.log('FORM_DATA=,', formData);
  }
}
