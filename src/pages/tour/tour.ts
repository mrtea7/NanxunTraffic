import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {TraInfoPage} from '../traInfo/traInfo'
import {ApiProvider} from '../../providers/providers'


@IonicPage()
@Component({
  selector: 'page-tour',
  templateUrl: 'tour.html'
})
export class TourPage {
  constructor(public navCtrl: NavController) {
  }

  goBack(){
    this.navCtrl.push(TraInfoPage);
  }
}
