import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';


import {ApiProvider} from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-construction-detail',
  templateUrl: 'constructionDetail.html'
})


export class ConstructionDetailPage {
  item: any = [];

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider, private navParams: NavParams) {
    this.item[0] = this.navParams.get('fillDept');
    this.item[1] = this.navParams.get('fillTime');
    this.item[2] = this.navParams.get('routeName');
    this.item[3] = this.navParams.get('position');
    this.item[4] = this.navParams.get('desTime');
    this.item[5] = this.navParams.get('recTime');
    this.item[6] = this.navParams.get('plan');
    this.item[7] = this.navParams.get('describe');
  }

}
