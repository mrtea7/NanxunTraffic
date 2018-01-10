import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapServerPage } from './mapServer';

@NgModule({
  declarations: [
    MapServerPage,
  ],
  imports: [
    IonicPageModule.forChild(MapServerPage),
  ],
})
export class MapServerPageModule { }
