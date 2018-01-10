import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {ApiProvider} from '../../providers/providers'


@IonicPage()
@Component({
  selector: 'page-pri',
  templateUrl: 'priServer.html'
})
export class PriServerPage {

  constructor(public navCtrl: NavController, public apiProvider: ApiProvider) {
    apiProvider.alert("apiProvider.alert")
  }
  dahaha(){
    alert(2)
  }



}
