import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoutePage } from './route';

import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    RoutePage,
  ],
  imports: [
    IonicPageModule.forChild(RoutePage),ComponentsModule
  ],
})
export class MapServerPageModule { }
