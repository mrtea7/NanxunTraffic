import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';

import {ApiProvider, AppGlobal} from '../../providers/providers'
import {AmapProvider} from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-bus',
  templateUrl: 'bus.html'
})


export class BusPage {
  kind = 'bus';
  searchQuery: string = '';
  latitude;
  longitude;
  nearBus: any[];
  allBusLine: any[];
  hasData: boolean = true;

  constructor(public navCtrl: NavController, public amapProvider: AmapProvider, public apiProvider: ApiProvider, private geolocation: Geolocation) {
    this.getGPS();
    this.getAllBusLine();
    // this.getNearBus(this.latitude, this.longitude);
  }

  public getGPS() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.getNearBus(this.latitude, this.longitude);
    }).catch((error) => {
      alert('获取当前GPS信息失败');
    });

  }

  getData() {

  }

  apps: any = {
    'bus': [
      // {
      //   name: '阿里巴巴',
      //   busline: '286，311'
      // },
      // {
      //   name: '朱庙',
      //   busline: '286、311、353、231、23'
      // }
    ],
    'line': [
      // {
      //   busline: '311',
      //   busStop: '火车站-中泰',
      //   busTime: '始发：6：00，末班18：00'
      // },
      // {
      //   busline: '211',
      //   busStop: '蒋村-中泰',
      //   busTime: '始发：6：00，末班18：00'
      // }
    ]
  };

  getItems(type: any) {
    this.kind = type;
    return this.apps[type];
  }

  isInclude(tar, ele) {
    let stringTar = JSON.stringify(tar);
    if (stringTar.includes(ele)) {
      return tar;
    }
  }

  filterItems(ev: any) {
    this.apps.bus = this.nearBus;
    this.apps.line = this.allBusLine;
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      if (this.kind == 'bus') {
        this.apps.bus = this.apps.bus.filter((item) => {
          return (item.name.indexOf(val) > -1);
        })
      } else if (this.kind == 'line') {
        this.apps.line = this.apps.line.filter((item) => {
          return (item.busline.indexOf(val) > -1);
        })
      }
    }

  }

  getNearBus(lat, lon) {
    this.apiProvider.httpGet(AppGlobal.API.getNearStation, {latitude: lat, longitude: lon}, res => {
      if (res.flag == "true" && res.data.length != 0) {
        this.nearBus = res.data;
        this.apps.bus = this.nearBus;
        this.hasData = true;
      }
      else if (res.flag == "true" && res.data.length == 0) {
        this.hasData = false;
      }
      else {
        this.apiProvider.toast(res.message)
      }
    })
  }

  getAllBusLine() {
    this.apiProvider.httpGet(AppGlobal.API.getBusLine, {nowStation: '-1'}, res => {
      if (res.flag == "true" && res.data.length != 0) {
        this.allBusLine = res.data;
        this.apps.line = this.allBusLine;
        this.hasData = true;
      }  else if (res.flag == "true" && res.data.length == 0) {
        this.hasData = false;
      }
      else {
        this.apiProvider.toast(res.message)
      }
    })
  }

  openPage(item) {
    if (item.name) {
      this.navCtrl.push('BusStationPage', {curStation: item.name})
    }
    else if (item.busline) {
      this.navCtrl.push('BusLinePage', {curBusLine: item.busline})
    }
  }
}
