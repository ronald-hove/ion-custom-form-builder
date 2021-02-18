import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import * as payform from 'payform';

import { IonCustomFormBuilderConfig } from './config-options-interface';
import { ION_CUSTOM_FORM_BUILDER_CONFIG } from './config-options.token';
import { FormField } from './form-field-interface';

@Component({
  selector: 'ion-custom-form-builder',
  templateUrl: './ion-custom-form-builder.component.html',
  styleUrls: ['./ion-custom-form-builder.component.scss'],
})
export class IonCustomFormBuilderComponent implements OnInit {

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
  ) {}


  ngOnInit() {
    this.formFields.forEach((element, index, self) => {
      this.formControls[`${element.formControlName}`] = ['', element.validators];
      if (element.formFieldType === 'credit-card') {
        // TODO:
        // write async validator for credit card input
      }
    });

    this.customForm = this.formBuilder.group(this.formControls);
    this.prePopulateForm();

    this.formBuilt = true;
  }

   /**
   *
   *
   * @param {*} icon
   * @return {*}
   * @memberof IonCustomFormBuilderComponent
   */
  public createCardIcon(icon) {
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
   * @memberof IonCustomFormBuilderComponent
   */
  public onSubmit() {
    if (this.checkErrors().length > 0) {
      return;
    }
    this.formSubmission.emit(this.customForm.value);
  }


  /**
   * Pre-populates the form with initial values if provided
   *
   * @private
   * @memberof IonCustomFormBuilderComponent
   */
  private prePopulateForm() {
    this.formFields.forEach((element, index, self) => {
      if (element.value !== undefined) {
        this.getFormControlByIndex(index).setValue(element.value);
        this.getFormControlByIndex(index).markAsTouched();
      }
    });
  }


  /**
   * Returns the abstract control for a form field
   *
   * @private
   * @param {number} index
   * @return {*}
   * @memberof IonCustomFormBuilderComponent
   */
  private getFormControlByIndex(index: number) {
    return this.customForm.get(`${this.formFields[index].formControlName}`);
  }

  /**
   *
   *
   * @private
   * @param {number} index
   * @return {*}
   * @memberof IonCustomFormBuilderComponent
   */
  public getFormControlByName(formControlName: string) {
    return this.customForm.get(formControlName);
  }

  /**
   * Validates card number using payform lib
   *
   * @private
   * @param {*} cardNumber
   * @memberof IonCustomFormBuilderComponent
   */
  private validateCardNumber(cardNumber: any) {
    return payform.validateCardNumber(cardNumber);
  }

  /**
   * Detects card type using payform lib
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
   * Checks if form has errors
   *
   * @private
   * @return {*}
   * @memberof IonCustomFormBuilderComponent
   */
  private checkErrors(): any[] {
    let errors: any[] = [];
    Object.keys(this.customForm.controls).forEach(field => {
      const formControlErrors: ValidationErrors = this.customForm.get(field).errors;
      if (formControlErrors != null) {
        errors.push({
          control: field,
          errors: formControlErrors
        });
        const control = this.customForm.get(field);
        control.markAsTouched({ onlySelf: true });
      }
    });
    return errors;
  }


}
