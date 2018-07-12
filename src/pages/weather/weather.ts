import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {TraInfoPage} from '../traInfo/traInfo'


@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage {
  constructor(public navCtrl: NavController) {
  }

  goBack(){
    this.navCtrl.push(TraInfoPage);
  }
}
