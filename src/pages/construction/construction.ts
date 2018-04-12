import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {ApiProvider} from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-construction',
  templateUrl: 'construction.html'
})


export class ConstructionPage {
  constructor(public navCtrl: NavController,  public apiProvider: ApiProvider) {
  }
}
