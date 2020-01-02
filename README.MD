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
import { IonCustomFormBuilderModule } from 'node-modules/ion-custom-form-builder';
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



# Advanced

```ts
...
import { IonCustomFormBuilderModule } from 'node-modules/ion-custom-form-builder';
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