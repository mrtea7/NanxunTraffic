import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {ApiProvider, AppGlobal} from '../../providers/providers'

import {ConstructionDetailPage} from '../constructionDetail/constructionDetail'
@IonicPage()
@Component({
  selector: 'page-construction',
  templateUrl: 'construction.html'
})


export class ConstructionPage {
  list: any[] = [

  ];

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider) {
    this.apiProvider.httpGet(AppGlobal.API.getConstruction, {queryParam: ''}, res => {
      if (res.flag == "true") {
        this.list = res.data;
      }
      else {
        this.apiProvider.toast(res.message)
      }
    })
  }

  itemSelected(item) {
    this.navCtrl.push('ConstructionDetailPage', item);
  }
}
