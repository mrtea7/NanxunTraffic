import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusPage } from './bus';

import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    BusPage,
  ],
  imports: [
    IonicPageModule.forChild(BusPage),ComponentsModule
  ],
})
export class BusPageModule { }
