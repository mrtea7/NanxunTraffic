import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";


@IonicPage()
@Component({
  selector: 'page-pub',
  templateUrl: 'pubTrans.html'
})
export class PubTransPage {
  constructor(public navCtrl: NavController) {
  }

  goBack(){
    this.navCtrl.push(HomePage);
  }
}
