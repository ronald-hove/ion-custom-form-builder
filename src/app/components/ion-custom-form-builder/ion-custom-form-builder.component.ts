import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import * as payform from 'payform';
import { Subscription } from 'rxjs';

import { IonCustomFormBuilderConfig } from './config-options-interface';
import { ION_CUSTOM_FORM_BUILDER_CONFIG } from './config-options.token';
import { FormField } from './form-field-interface';
import { IonCustomFormBuilderService } from './ion-custom-form-builder.service';

@Component({
  selector: 'ion-custom-form-builder',
  templateUrl: './ion-custom-form-builder.component.html',
  styleUrls: ['./ion-custom-form-builder.component.scss'],
})
export class IonCustomFormBuilderComponent implements OnInit, OnDestroy {


  /**
   *
   *
   * @type {Subscription}
   * @memberof IonCustomFormBuilderComponent
   */
  creditCardInputSubscription: Subscription


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
   * @type {FormField []}
   * @memberof IonCustomFormBuilderComponent
   */
  @Input() formFields: FormField [] = [];

  /**
   *
   *
   * @memberof IonCustomFormBuilderComponent
   */
  @Input() submitButtonText  = 'Submit';

  /**
   *
   *
   * @memberof IonCustomFormBuilderComponent
   */
  @Input() showLabels = true;

  /**
   *
   *
   * @memberof IonCustomFormBuilderComponent
   */
  @Input() showIcons = true;

  /**
   *
   *
   * @memberof IonCustomFormBuilderComponent
   */
  @Input() showCardIcons = true;

  /**
   *
   *
   * @memberof IonCustomFormBuilderComponent
   */
  @Input() returnCreditCardType = false;

  /**
   * Supports ionic theme colors defined in theme/variables.css i.e 'primary', 'secondary'
   *
   * @type {string}
   * @memberof IonCustomFormBuilderComponent
   */
  @Input() iconColor: string = this.config ? this.config.defaultIconColor : undefined;

  /**
   * Supports ionic theme colors defined in theme/variables.css i.e 'primary', 'secondary'
   *
   * @type {string}
   * @memberof IonCustomFormBuilderComponent
   */
  @Input() submitButtonColor: string = this.config ? this.config.submitButtonColor : undefined;

  /**
   *
   *
   * @type {EventEmitter<any>}
   * @memberof IonCustomFormBuilderComponent
   */
  @Output() formSubmission: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private ionCustomFormBuilderService: IonCustomFormBuilderService,
    private formBuilder: FormBuilder,
    @Inject(ION_CUSTOM_FORM_BUILDER_CONFIG) private config: IonCustomFormBuilderConfig
  ) {}


  ngOnInit() {
    this.buildFormControlsConfig();
    this.customForm = this.formBuilder.group(this.formControls);
    this.prePopulateForm();
    this.watchCreditCardInput();
    this.formBuilt = true;
    this.watchFormSubmissionTriggerByService();
  }



  ngOnDestroy() {
    this.creditCardInputSubscription.unsubscribe();
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
   * Returns the abstract control for a form field by name
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
   *
   *
   * @private
   * @memberof IonCustomFormBuilderComponent
   */
  private buildFormControlsConfig() {
    this.formFields.forEach((element, index) => {
      switch (element.formFieldType) {
        case 'credit-card':
          this.formFields[index].validationMessages.push({
            type: 'creditCardValidator',
            message: 'Credit card number is invalid'
          });
          this.creditCardFieldIndex = index;
          this.formControls[`${element.formControlName}`] = new FormControl(null,
            {
              validators: element.validators,
              asyncValidators: [
                this.creditCardValidator.bind(this)
              ]
            });
          break;
        default:
          if (element.asyncValidators) {
            this.formControls[`${element.formControlName}`] = new FormControl(null,
              {
                validators: element.validators,
                asyncValidators: this.processAsyncValidators(element, this)
              });
          } else {
            this.formControls[`${element.formControlName}`] = ['', element.validators];
          }
          break;
      }
    });
  }

  /**
   *
   *
   * @private
   * @param {FormField} element
   * @param {this} form
   * @return {*}
   * @memberof IonCustomFormBuilderComponent
   */
  private processAsyncValidators(element: FormField, abstractControl: this) {
    element.asyncValidators.forEach(asyncValidator => {
      asyncValidator.bind(abstractControl)
    })
    return element.asyncValidators;
  }

  /**
   *
   *
   * @private
   * @memberof IonCustomFormBuilderComponent
   */
  private watchFormSubmissionTriggerByService() {
    this.ionCustomFormBuilderService.triggerFormSubmission$.subscribe( trigger => {
      if (trigger) {
        this.onSubmit();
      }
    })
  }

  /**
   *
   *
   * @private
   * @memberof IonCustomFormBuilderComponent
   */
  private watchCreditCardInput() {
    if(this.creditCardFieldIndex !== undefined) {
      this.creditCardInputSubscription = this.getFormControlByIndex(this.creditCardFieldIndex)
      .valueChanges
      .subscribe(cardNumberValue => {
        this.detectCardType(cardNumberValue);
      })
    }
  }


  /**
   *
   *
   * @private
   * @param {AbstractControl} control
   * @return {*}  {Promise<any>}
   * @memberof IonCustomFormBuilderComponent
   */
  private creditCardValidator(control: AbstractControl): Promise<any> {
    if (!control.parent) {
      return Promise.resolve(null)
    }else if (control?.value && !this.isCardNumberValid(control.value)) {
      control.markAsTouched({ onlySelf: true });
      return Promise.resolve({ creditCardValidator: { valid: false } });
    }else {
      return Promise.resolve(null)
    }
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
   * Returns the abstract control for a form field by index
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
   * Validates card number using payform lib
   *
   * @private
   * @param {*} cardNumber
   * @memberof IonCustomFormBuilderComponent
   */
  private isCardNumberValid(cardNumber: any) {
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
