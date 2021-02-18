import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { IonCustomFormBuilderModule } from './../components/ion-custom-form-builder/ion-custom-form-builder.module';


@NgModule({
  imports: [
    IonCustomFormBuilderModule.forRoot(),
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
