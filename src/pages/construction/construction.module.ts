import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConstructionPage } from './construction';


@NgModule({
  declarations: [
    ConstructionPage,
  ],
  imports: [
    IonicPageModule.forChild(ConstructionPage)
  ],
})
export class MapServerPageModule { }
