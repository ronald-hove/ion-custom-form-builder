import { AbstractControl, Validators } from '@angular/forms';
/*
* icon: ion-icon name
*
* title: Form field label
*
* formControlName: Used to identify the field by angular form builder
*
* value: Form field controller holds form input data
*
* validators: An array of validators ie [Validators.required, Validators.minLength(10) . . ] full list of form validators in angular docs
*
* type: i.e <input type="text"> | support 'email', 'number', 'password', 'text', 'tel'
*
* placeholder: Preset form field value
*
* formFieldType: Current version supports 'inline' and 'textarea'
*
* textAreaRowCount: The height in rows if formFieldType === 'textarea'
*
* errors: A boolean for whether or not form field has additional errors apart from validation errors i.e errors applied on a network callback
*/
export interface FormField {
    icon: string;
    title: string;
    formControlName: string;
    value: AbstractControl;
    validators: Validators[];
    type: string;
    placeholder?: string;
    formFieldType?: string;
    textAreaRowCount?: number;
    errors?: boolean;
}
