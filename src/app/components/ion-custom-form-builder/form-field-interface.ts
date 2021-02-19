import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export interface FormField {
    /**
     *
     *
     * @type {string}
     * @memberof FormField
     */
    icon?: string;

    /**
     *
     *
     * @type {string}
     * @memberof FormField
     */
    title: string;

    /**
     *
     *
     * @type {string}
     * @memberof FormField
     */
    formControlName: string;

    /**
     *
     *
     * @type {Validators[]}
     * @memberof FormField
     */
    validators?: ValidatorFn[];

    /**
     *
     *
     * @type {AsyncValidator}
     * @memberof FormField
     */
    asyncValidators?: AsyncValidatorFn[];


    /**
     *
     *
     * @type {string}
     * @memberof FormField
     */
    type: string;

    /**
     *
     *
     * @type {string}
     * @memberof FormField
     */
    placeholder?: string;

    /**
     *
     *
     * @type {*}
     * @memberof FormField
     */
    value?: any;

    /**
     *
     *
     * @type {string}
     * @memberof FormField
     */
    formFieldType?: string;

    /**
     *
     *
     * @type {number}
     * @memberof FormField
     */
    textAreaRowCount?: number;

    /**
     *
     *
     * @type {string}
     * @memberof FormField
     */
    labelPosition?: string;

    /**
     *
     *
     * @type {ValidationMessage []}
     * @memberof FormField
     */
    validationMessages?: ValidationMessage []
}

export interface ValidationMessage {
  type: string;
  message: string;
}
