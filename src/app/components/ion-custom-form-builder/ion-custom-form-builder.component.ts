import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as payform from 'payform';

import { IonCustomFormBuilderConfig } from './config-options-interface';
import { ION_CUSTOM_FORM_BUILDER_CONFIG } from './config-options.token';
import { FormField } from './form-field-interface';

@Component({
  selector: 'ion-custom-form-builder',
  templateUrl: './ion-custom-form-builder.component.html',
  styleUrls: ['./ion-custom-form-builder.component.scss'],
})
export class IonCustomFormBuilderComponent implements OnInit, OnChanges {

  /**
   *
   *
   * @type {FormGroup}
   * @memberof IonCustomFormBuilderComponent
   */
  customForm: FormGroup;

  /**
   *
   *
   * @type {*}
   * @memberof IonCustomFormBuilderComponent
   */
  formControls: any = {};

  /**
   *
   *
   * @memberof IonCustomFormBuilderComponent
   */
  formBuilt = false;

  /**
   *
   *
   * @type {*}
   * @memberof IonCustomFormBuilderComponent
   */
  masks: any;

  /**
   *
   *
   * @type {number}
   * @memberof IonCustomFormBuilderComponent
   */
  creditCardFieldIndex: number;

  /**
   *
   *
   * @memberof IonCustomFormBuilderComponent
   */
  creditCardImg = 'generic.svg';

  @Input() formFields: FormField [] = [];
  @Input() submitButtonText  = 'Submit';
  @Input() errorsIndex: [] = [];
  @Input() showLabels = true;
  @Input() showIcons = true;
  @Input() showCardIcons = true;
  @Input() returnCreditCardType = false;
  /* supports ionic theme colors defined in theme/variables.css i.e 'primary', 'secondary' */
  @Input() iconColor: string = this.config ? this.config.defaultIconColor : undefined;
  @Input() submitButtonColor: string = this.config ? this.config.submitButtonColor : undefined;
  @Output() formSubmission: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    @Inject(ION_CUSTOM_FORM_BUILDER_CONFIG) private config: IonCustomFormBuilderConfig
  ) {
    this.masks = {
      cardExpiry: [/[0-1]/, /\d/, '/', /[1-9]/, /\d/],
      cardNumber: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
      dateAutoCorrect: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
    };
   }

  ngOnChanges() {
    this.errorsIndex.forEach((index) => {
      this.formFields[index].errors = true;
    });
  }

  ngOnInit() {
    this.formFields.forEach((element, index, arr) => {
      this.formControls[`${element.formControlName}`] = ['', element.validators];
      if (element.type === 'email') {
        this.formFields[index].validators.push(Validators.email);
      }
    });

    this.customForm = this.formBuilder.group(this.formControls);

    this.formFields.forEach((element, index, arr) => {
      this.formFields[index].control = this.customForm.controls[`${element.formControlName}`];
      if (element.placeholder !== undefined) {
        this.formFields[index].control.setValue(element.formFieldValue);
        this.formFields[index].control.markAsTouched();
      }

      if (element.formFieldType === 'card') {
        this.creditCardFieldIndex = index;
      }
    });

    this.formBuilt = true;

    this.watchPasswordInput();
    this.watchCardNumberInput();
  }

  /**
   *
   *
   * @private
   * @memberof IonCustomFormBuilderComponent
   */
  private watchPasswordInput() {
    this.customForm.valueChanges.subscribe(result => {
      Object.keys(result).forEach((key, index, arr) => {
        if (result.hasOwnProperty('password') && result.hasOwnProperty('confirm_password')) {
          const passwordIndex = arr.indexOf('password');
          const confirmPasswordIndex = arr.indexOf('confirm_password');
          this.handlePasswords(passwordIndex, confirmPasswordIndex);
        }
      });
    });
  }

  /**
   *
   *
   * @private
   * @memberof IonCustomFormBuilderComponent
   */
  private watchCardNumberInput() {
    if (this.creditCardFieldIndex !== undefined) {
      this.formFields[this.creditCardFieldIndex].control.valueChanges.subscribe(cardNumber => {
        this.validateCardNumber(cardNumber);
        this.detectCardType(cardNumber);
      });
    }
  }

  /**
   *
   *
   * @private
   * @param {*} cardNumber
   * @memberof IonCustomFormBuilderComponent
   */
  private validateCardNumber(cardNumber: any) {
    if (payform.validateCardNumber(cardNumber) === false) {
      this.formFields[this.creditCardFieldIndex].errors = true;
    } else {
      this.formFields[this.creditCardFieldIndex].errors = false;
    }
  }

  /**
   *
   *
   * @private
   * @param {*} cardNumber
   * @memberof IonCustomFormBuilderComponent
   */
  private detectCardType(cardNumber: any) {
    if (payform.parseCardType(cardNumber) === 'visa') {
      this.creditCardImg = 'visa.svg';
    } else if (payform.parseCardType(cardNumber) === 'amex') {
      this.creditCardImg = 'amex.svg';
    } else if (payform.parseCardType(cardNumber) === 'mastercard') {
      this.creditCardImg = 'master.svg';
    } else {
      this.creditCardImg = 'generic.svg';
    }
  }

  /**
   *
   *
   * @param {*} icon
   * @return {*}
   * @memberof IonCustomFormBuilderComponent
   */
  createCardIcon(icon) {
    const iconUrl = `assets/${icon}`;
    return {
      'width': '14%',
      'margin-top': icon === 'master.svg' ? '10px' : '5px',
      'margin-right': '12px',
      'content': `url(${iconUrl})`
    };
  }


  /**
   *
   *
   * @private
   * @param {number} passwordIndex
   * @param {number} confirmPasswordIndex
   * @memberof IonCustomFormBuilderComponent
   */
  private handlePasswords(passwordIndex: number, confirmPasswordIndex: number) {
    if (this.formFields[passwordIndex].control.value.length > 0 &&
      this.formFields[passwordIndex].control.value !== this.formFields[confirmPasswordIndex].control.value) {
      this.formFields[passwordIndex].title = this.formFields[confirmPasswordIndex].title = 'Passwords don\'t match';
      this.formFields[passwordIndex].errors = this.formFields[confirmPasswordIndex].errors = true;
    } else {
      this.formFields[passwordIndex].title = 'Password';
      this.formFields[confirmPasswordIndex].title = 'Confirm Password';
      this.formFields[passwordIndex].errors = this.formFields[confirmPasswordIndex].errors = false;
    }
  }

  /**
   *
   *
   * @memberof IonCustomFormBuilderComponent
   */
  submitForm() {
    const formData = {};
    this.formFields.forEach((element, index, arr) => {
      formData[`${element.formControlName}`]  = this.formFields[index].control.value;
    });
    if (formData.hasOwnProperty('confirm_password')) {
      delete formData['confirm_password'];
    }
    let detectCardFormFieldArr: FormField[] = [];
    detectCardFormFieldArr = this.formFields.filter((element, index, arr) => {
      return element.formFieldType === 'card';
    });
    if (detectCardFormFieldArr.length > 0 && this.returnCreditCardType === true) {
      formData['card_type'] = payform.parseCardType(formData['card']);
    }
    this.formSubmission.emit(formData);
  }

  /**
   *
   *
   * @return {*}
   * @memberof IonCustomFormBuilderComponent
   */
  hasValidationErrors() {
    const controlErrors: ValidationErrors[] = [];
    Object.keys(this.customForm.controls).forEach(key => {
      controlErrors.push(this.customForm.get(key).errors);
    });
    // tslint:disable-next-line: no-shadowed-variable
    const result = controlErrors.filter((element, index, arr) => {
      return element !== null;
    });
    return result.length !== 0 ;
  }

  /**
   *
   *
   * @return {*}
   * @memberof IonCustomFormBuilderComponent
   */
  hasFieldErrors() {
    const fieldErrors = this.formFields.filter((element, index, arr) => {
      return element.errors === true;
    });
    return fieldErrors.length !== 0;
  }
}
