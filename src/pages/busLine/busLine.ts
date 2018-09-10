import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {ApiProvider, AppGlobal} from '../../providers/providers'
import {AmapProvider} from '../../providers/providers'


@IonicPage()
@Component({
  selector: 'page-busLine',
  templateUrl: 'busLine.html'
})


export class BusLinePage {
  nowStation: string;
  busLine: string;
  curBusLine: string;
  hasData: boolean = true;

  constructor(public navCtrl: NavController, public navParam: NavParams, public amapProvider: AmapProvider, public apiProvider: ApiProvider) {
    this.nowStation = navParam.get('curStation');
    this.curBusLine = navParam.get('curBusLine');
    this.busLine = navParam.get('busLine');
    if (this.curBusLine === undefined) {
      this.getBusLocation(this.nowStation, this.busLine)
    } else
      this.getBusLocation('', this.curBusLine)

  }

  buss: any = [
    // {
    //   order: '1',
    //   busline: '311',
    //   nextStation: '阿里巴巴',
    //   busStop: '中泰-车站',
    //   distance: '67',
    //   stationCount:'3'
    // },
    // {
    //   order: '2',
    //   busline: '311',
    //   nextStation: '中泰',
    //   busStop: '中泰-车站',
    //   distance: '67',
    //   stationCount:'5'
    // },
    // {
    //   order: '3',
    //   busline: '311',
    //   nextStation: '永复村',
    //   busStop: '中泰-车站',
    //   distance: '67',
    //   stationCount:'7'
    // }
  ];


  getBuss() {
    return this.buss;
  }

  getBusLocation(stationName, busLine) {
    this.apiProvider.httpGet(AppGlobal.API.getBusLocation, {nowStation: stationName, busline: busLine}, res => {
      if (res.flag == "true" && res.data.length != 0) {
        this.hasData = true;
        this.buss = res.data;
      } else if (res.flag == "true" && res.data.length == 0) {
        this.hasData = false;
      }
      else {
        this.apiProvider.toast(res.message)
      }
    })
  }
}
