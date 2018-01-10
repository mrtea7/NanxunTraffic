import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PriServerPage } from './priServer';

import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    PriServerPage,
  ],
  imports: [
    IonicPageModule.forChild(PriServerPage),ComponentsModule
  ],
})
export class PriServerPageModule { }
