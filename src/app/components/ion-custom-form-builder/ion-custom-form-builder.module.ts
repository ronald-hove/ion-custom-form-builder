import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { IonCustomFormBuilderConfig } from './config-options-interface';
import { ION_CUSTOM_FORM_BUILDER_CONFIG } from './config-options.token';
import { IonCustomFormBuilderComponent } from './ion-custom-form-builder.component';

const Components = [
  IonCustomFormBuilderComponent
];

@NgModule({
  declarations: [
    Components
  ],
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
],
  exports: [
    Components
  ]
})
export class IonCustomFormBuilderModule {
  static forRoot(options?: IonCustomFormBuilderConfig): ModuleWithProviders<any> {
    return {
      ngModule: IonCustomFormBuilderModule,
      providers: [
        {
          provide: ION_CUSTOM_FORM_BUILDER_CONFIG,
          useValue: options
        }
      ]
    };
  }
}
