# Ionic Custom Form Builder

This is an ionic-angular component library for building forms with the highlight of doing form validation so you don't have to.

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


Output

![Xcode Preview Image 1](demo.gif)


# Advanced

```ts
...
import { IonCustomFormBuilderModule } from 'ion-custom-form-builder';
...

@NgModule({
  imports: [
    ...
    IonCustomFormBuilderModule.forRoot({
      defaultCssClass: 'overide-default-form-input',
      errorCssClass: 'form-error',
      successCssClass: 'form-success'
    })
    ...
  ]
})

...
```