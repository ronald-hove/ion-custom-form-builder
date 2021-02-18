import { IonCustomFormBuilderConfig } from './config-options-interface';
import { ION_CUSTOM_FORM_BUILDER_CONFIG } from './config-options.token';
import { IonCustomFormBuilderComponent } from './ion-custom-form-builder.component';
import { IonicModule } from '@ionic/angular';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
