import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PubTransPage } from './pubTrans';

@NgModule({
  declarations: [
    PubTransPage,
  ],
  imports: [
    IonicPageModule.forChild(PubTransPage),
  ],
})
export class PubTransPageModule { }
