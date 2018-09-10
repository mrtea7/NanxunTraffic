import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusStationPage } from './busStation';

import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    BusStationPage,
  ],
  imports: [
    IonicPageModule.forChild(BusStationPage),ComponentsModule
  ],
})
export class BusStationPageModule { }
