import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {AmapProvider} from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-pri',
  templateUrl: 'priServer.html'
})
export class PriServerPage {
  @ViewChild('map_container') map_container: ElementRef;
  constructor(public navCtrl: NavController, public amapProvider: AmapProvider) {
  }
  loadMap(ele, mapName) {
    this.amapProvider.initMap(ele, mapName);

  }
  ionViewWillEnter() {
    this.loadMap(this.map_container.nativeElement, 'priServer');
  }

  ionViewWillLeave() {
    this.amapProvider.destroyMap('priServer')
  }


}
