import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";

import {AmapProvider} from '../../providers/providers'
@IonicPage()
@Component({
  selector: 'page-tra',
  templateUrl: 'traInfo.html'
})
export class TraInfoPage {
  @ViewChild('map_container') map_container: ElementRef;
  constructor(public navCtrl: NavController, public amapProvider: AmapProvider) {
  }
  loadMap(ele, mapName) {
    this.amapProvider.initMap(ele, mapName);

  }
  plan() {
    this.navCtrl.push('PlanPage')
  }
  weather() {
    this.navCtrl.push('WeatherPage')
  }
  tour() {
    this.navCtrl.push('TourPage')
  }
  bus() {
    this.navCtrl.push('BusPage')
  }
  construction() {
    this.navCtrl.push('ConstructionPage')
  }
  goBack(){
    this.navCtrl.push(HomePage);
  }
  // ionViewWillEnter() {
  //   this.loadMap(this.map_container.nativeElement, 'traInfo');
  // }

  // ionViewWillLeave() {
  //   this.amapProvider.destroyMap('traInfo')
  // }
}
