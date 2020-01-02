import { AbstractControl, Validators } from '@angular/forms';

export interface FormField {
    icon: string;
    title: string;
    formControlName: string;
    value: AbstractControl;
    validators: Validators[];
    type: string;
    placeholder?: string;
    formFeildType?: string;
    textAreaRowCount?: number;
    errors?: boolean;
}
