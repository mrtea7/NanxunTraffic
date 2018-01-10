import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {AmapProvider} from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'mapServer.html'
})
export class MapServerPage {
  @ViewChild('map_container') map_container: ElementRef;

  currentItems: any = [];

  constructor(public navCtrl: NavController, public amapProvider: AmapProvider) {
  }

  filterItems(ev) {
    let val = ev.target.value;

    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    console.log("<this.currentItems>",val);
  }

  loadMap(ele, mapServer) {
    this.amapProvider.initMap(ele, mapServer);
    /*this.map = new AMap.Map('map_container', {
     resizeEnable: true,
     zoom: 11,
     center: [116.397428, 39.90923]
     });*/
  }

  showRoutePage() {
    this.navCtrl.push('RoutePage')
  }

  ionViewWillEnter() {
    this.loadMap(this.map_container.nativeElement, 'mapServer');
  }

  ionViewWillLeave() {
    this.amapProvider.destroyMap('mapServer')
  }

}
