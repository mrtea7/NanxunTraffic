import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {ApiProvider, AppGlobal} from '../../providers/providers'
import {AmapProvider} from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-bus',
  templateUrl: 'busStation.html'
})


export class BusStationPage {
  nowStation: string;
  hasData: boolean = true;
  constructor(public navCtrl: NavController, public amapProvider: AmapProvider,public apiProvider: ApiProvider,public navParam: NavParams) {
    this.nowStation = navParam.get('curStation');
    this.getBusLine(this.nowStation);
  }

  station: any = [
    // {
    //   busline: '311',
    //   busStop: '火车站-中泰',
    //   busTime: '始发：6：00，末班18：00'
    // },
    // {
    //   busline: '311',
    //   busStop: '中泰-火车站',
    //   busTime: '始发：6：00，末班18：00'
    // },
    // {
    //   busline: '211',
    //   busStop: '蒋村-中泰',
    //   busTime: '始发：6：00，末班18：00'
    // }
  ];

  getItems() {
    return this.station;
  }
  getBusLine(stationName) {
    this.apiProvider.httpGet(AppGlobal.API.getBusLine, {nowStation: stationName}, res => {
      if (res.flag == "true" && res.data.length != 0) {
        this.station = res.data;
        this.hasData = true;
      } else if (res.flag == "true" && res.data.length == 0) {
        this.hasData = false;
      }
      else {
        this.apiProvider.toast(res.message)
      }
    })
  }
  openLine(busLine) {
    this.navCtrl.push('BusLinePage',{curStation:this.nowStation,busLine:busLine})
  }
}
