import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {AmapProvider} from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-pub',
  templateUrl: 'pubTrans.html'
})
export class PubTransPage {
  @ViewChild('map_container') map_container: ElementRef;

  constructor(public navCtrl: NavController, public amapProvider: AmapProvider) {
  }

  loadMap(ele, mapName) {
    this.amapProvider.initMap(ele, mapName);

  }
  ionViewWillEnter() {
    this.loadMap(this.map_container.nativeElement, 'pubTrans');
  }

  ionViewWillLeave() {
    this.amapProvider.destroyMap('pubTrans')
  }

}
