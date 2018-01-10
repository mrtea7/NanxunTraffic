import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {AmapProvider} from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-route',
  templateUrl: 'route.html'
})
export class RoutePage {
  routes: any[] = [
    {type: '推荐', time: '54', distance: '19.4'},
    {type: '方案2', time: '55', distance: '19.4'},
    {type: '时间最短', time: '50', distance: '21.4'}

  ];

  @ViewChild('map_container') map_container: ElementRef;

  constructor(public navCtrl: NavController, public amapProvider: AmapProvider) {
  }

  loadMap(ele, mapName) {
    this.amapProvider.initMap(ele, mapName);
  }

  ionViewWillEnter() {
    this.loadMap(this.map_container.nativeElement, 'route');
  }

  ionViewWillLeave() {
    this.amapProvider.destroyMap('route')
  }
}
