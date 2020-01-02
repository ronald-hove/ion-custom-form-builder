# Ionic Custom Form Builder

This is an ionic-angular component library for building forms with the highlight of doing form validation so you don't have to.


Usage Example Output

![Xcode Preview Image 1](demo.gif)

# Installation

In your project root, run

```txt
npm i ion-custom-form-builder
```

# Usage Example

Lets walk through a *getting started* example that will show you how to setup the component in your project

import the module in your top level *.module.ts file

```ts
...
import { IonCustomFormBuilderModule } from 'ion-custom-form-builder';
...

@NgModule({
  imports: [
    ...
    IonCustomFormBuilderModule.forRoot()
    ...
  ]
})

...
```

Now in your *.page.html file add

```html
...
  <ion-custom-form-builder
    [formFields]="fields"
    [submitButtonText]="'Submit'"
    (formSubmission)="submitForm($event)" 
  >
  </ion-custom-form-builder>
...
```

Head over to your  *.page.ts file and add

```ts

  ...
  import { FormFeild } from 'ion-custom-form-builder';
  import { AbstractControl, Validators } from '@angular/forms';
  ...

  fields: FormFeild[] = [];
  email: AbstractControl;
  password: AbstractControl;

  constructor() {
    this.fields = [
      {
        icon: 'mail',
        type: 'email',
        title: 'Email',
        formControlName: 'email',
        value: this.email,
        validators: [Validators.required]
      },
      {
        icon: 'lock',
        type: 'password',
        title: 'Password',
        formControlName: 'password',
        value: this.email,
        validators: [Validators.required]
      }
    ];
  }

  submitForm(formData) {
    console.log('FORM_DATA=,', formData);
  }

  ...

```

The FormField interface has the following structure with some important notes

```ts
export interface FormField {
    icon: string; // Input field icon 
    title: string; // Input field title
    formControlName: string; // formControl name and value should be the same respective of their types
    value: AbstractControl;
    validators: Validators[]; // email regular expression validator is handled by the component logic 
    type: string;
    placeholder?: string;
    formFeildType?: string; // Current version supports 'inline' and 'textarea'
    textAreaRowCount?: number;
    errors?: boolean;
}

```


# Css Styling

By default the form builder component has the following css classes applied on Success or Error Validations

```css
.default-form-input {
  border: 1px solid #007bff;
  border-radius: 0.5rem;
  margin-top: 16px;
  width: 80%;
}

.default-form-input-error {
  border: 1px solid #dc3545;
}

.default-form-input-success {
  border: 1px solid #28a745;
}
```

In order to get your own colors on Success or Error Validations, you can override the defaults by placing your css classes in the **global.scss** file

**IMPORTANT**

Use the following rules when you override the css classes 

If you override the any of the classes, you have to include all the original class properties and set them as important 

e.g
```css
.override-default-form-input{
  border: 1px solid your_new_color !important;
  border-radius: your_new_border_radius !important;
  margin-top: your_new_border_margin !important;
  width: your_new_border_width !important;
}

```

For success and error classes, only override the border class property


# Applying Css Styling
<h2>Method 1: add the classes as module configuration options</h2>

```ts
...
import { IonCustomFormBuilderModule } from 'ion-custom-form-builder';
...

@NgModule({
  imports: [
    ...
    IonCustomFormBuilderModule.forRoot({
      defaultCssClass: 'override-default-form-input',
      errorCssClass: 'override-default-form-error',
      successCssClass: 'override-default-form-success'
    })
    ...
  ]
})
...
```


<h2>Method 2: Use component Inputs</h2>

```html
...
  <ion-custom-form-builder
    [formFields]="fields"
    [submitButtonText]="'Submit'"
    [defaultCssClass]="override-default-form-input'"
    [errorCssClass]="'override-default-form-error'"
    [successCssClass]="'override-default-form-success'"
    (formSubmission)="submitForm($event)" 
  >
  </ion-custom-form-builder>
...
```