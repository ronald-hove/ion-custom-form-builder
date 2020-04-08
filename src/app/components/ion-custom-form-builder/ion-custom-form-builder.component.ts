import { IonCustomFormBuilderConfig } from './config-options-interface';
import { ION_CUSTOM_FORM_BUILDER_CONFIG } from './config-options.token';
import { FormField } from './form-field-interface';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, Inject } from '@angular/core';
import * as  payform from 'payform';

@Component({
  selector: 'ion-custom-form-builder',
  templateUrl: './ion-custom-form-builder.component.html',
  styleUrls: ['./ion-custom-form-builder.component.scss'],
})
export class IonCustomFormBuilderComponent implements OnInit, OnChanges {

  customForm: FormGroup;
  formControls: any = {};
  formBuilt = false;
  emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
  masks: any;

  creditCardFieldIndex: number;
  creditCardImg = 'generic.svg';

  @Input() formFields: FormField [] = [];
  @Input() submitButtonText  = 'Submit';
  @Input() errorsIndex: [] = [];
  @Input() defaultCssClass = this.config ? this.config.defaultCssClass : undefined;
  @Input() successCssClass = this.config ? this.config.successCssClass : undefined;
  @Input() errorCssClass = this.config ? this.config.errorCssClass : undefined;
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
    // tslint:disable-next-line: no-shadowed-variable
    this.formFields.forEach((element, index, arr) => {
      this.formControls[`${element.formControlName}`] = ['', element.validators];
      if (element.type === 'email') {
        this.formFields[index].validators.push(Validators.pattern(this.emailRegEx));
      }
    });

    this.customForm = this.formBuilder.group(this.formControls);

    // tslint:disable-next-line: no-shadowed-variable
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

    this.customForm.valueChanges.subscribe(result => {
      Object.keys(result).forEach((key, index, arr) => {
        if (result.hasOwnProperty('password') && result.hasOwnProperty('confirm_password')) {
          const passwordIndex = arr.indexOf('password');
          const confirmPasswordIndex = arr.indexOf('confirm_password');
          this.handlePasswords(passwordIndex, confirmPasswordIndex);
        }
      });
    });

    if (this.creditCardFieldIndex !== undefined) {
      this.formFields[this.creditCardFieldIndex].control.valueChanges.subscribe (cardNumber => {
        this.validateCardNumber(cardNumber);
        this.detectCardType(cardNumber);
      });
    }
  }

  private validateCardNumber(cardNumber: any) {
    if (payform.validateCardNumber(cardNumber) === false) {
      this.formFields[this.creditCardFieldIndex].errors = true;
    } else {
      this.formFields[this.creditCardFieldIndex].errors = false;
    }
  }

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

  createCardIcon(icon) {
    const iconUrl = `assets/${icon}`;
    return {
      // tslint:disable-next-line: object-literal-key-quotes
      'width': '14%',
      'margin-top': icon === 'master.svg' ? '10px' : '5px',
      'margin-right': '12px',
      // tslint:disable-next-line: object-literal-key-quotes
      'content': `url(${iconUrl})`
    };
  }


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

  submitForm() {
    const formData = {};
    // tslint:disable-next-line: no-shadowed-variable
    this.formFields.forEach((element, index, arr) => {
      formData[`${element.formControlName}`]  = this.formFields[index].control.value;
    });
    if (formData.hasOwnProperty('confirm_password')) {
      // tslint:disable-next-line: no-string-literal
      delete formData['confirm_password'];
    }
    let detectCardFormFieldArr: FormField[] = [];
    detectCardFormFieldArr = this.formFields.filter((element, index, arr) => {
      return element.formFieldType === 'card';
    });
    if (detectCardFormFieldArr.length > 0 && this.returnCreditCardType === true) {
      // tslint:disable-next-line: no-string-literal
      formData['card_type'] = payform.parseCardType(formData['card']);
    }
    this.formSubmission.emit(formData);
  }

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

  hasFieldErrors() {
    // tslint:disable-next-line: no-shadowed-variable
    const fieldErrors = this.formFields.filter((element, index, arr) => {
      return element.errors === true;
    });
    return fieldErrors.length !== 0;
  }

  setCssClasses(field: FormField) {
    const classes = {};
    // tslint:disable-next-line: no-string-literal
    classes[this.defaultCssClass ? `${this.defaultCssClass}` : 'default-form-input'] = true;
    // tslint:disable-next-line: max-line-length
    classes[this.errorCssClass ? `${this.errorCssClass}` : 'default-form-input-error'] = field.control.touched && field.control.errors || field.errors ? true : false;
    // tslint:disable-next-line: max-line-length
    classes[this.successCssClass ? `${this.successCssClass}` : 'default-form-input-success'] = !field.control.errors && !field.errors ? true : false;
    return classes;
  }

}
