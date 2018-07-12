import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConstructionDetailPage } from './constructionDetail';


@NgModule({
  declarations: [
    ConstructionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ConstructionDetailPage)
  ],
})
export class MapServerPageModule { }
