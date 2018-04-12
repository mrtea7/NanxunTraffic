import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {ApiProvider} from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html'
})


export class PlanPage {
  constructor(public navCtrl: NavController,  public apiProvider: ApiProvider) {
  }
}
