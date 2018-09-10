import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusLinePage } from './busLIne';

import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    BusLinePage,
  ],
  imports: [
    IonicPageModule.forChild(BusLinePage),ComponentsModule
  ],
})
export class BusLinePageModule { }
