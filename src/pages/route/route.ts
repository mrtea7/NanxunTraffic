import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {AmapProvider} from '../../providers/providers'
import {ApiProvider} from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-route',
  templateUrl: 'route.html'
})


export class RoutePage {
  routes: any[] = [
    {type: '推荐', time: '54', distance: '19.4'},
    {type: '距离最短', time: '55', distance: '19.4'},
    {type: '时间最短', time: '50', distance: '21.4'}

  ];
  route: any = {start: {city: "", place: ""}, end: {city: "", place: ""}, temp: {city: "", place: ""}};
  drawType: string;
  auto: any;
  @ViewChild('map_container') map_container: ElementRef;

  constructor(public navCtrl: NavController, public amapProvider: AmapProvider, public apiProvider: ApiProvider) {
  }

  loadMap(ele, mapName) {
    this.amapProvider.initMap(ele, mapName);
  }

  //切换起始点
  swap() {
    this.route.temp.city = this.route.start.city;
    this.route.temp.place = this.route.start.place;
    this.route.start.city = this.route.end.city;
    this.route.start.place = this.route.end.place;
    this.route.end.city = this.route.temp.city;
    this.route.end.place = this.route.temp.place;
  }

  //重新设置起始点名称
  reName(data) {
    this.route.start.place = data.originName;
    this.route.end.place = data.destinationName;
  }

  //驾车线路规划
  drawDriving(policy) {
    if (this.checkRouteEmpty()) {
      this.drawType = "driving";
      let drivingPolicy = policy;
      this.amapProvider.drawDriving(this.route, drivingPolicy);
    }

  }

  //公交路线规划
  drawTransfer() {
    if (this.checkRouteEmpty()) {
      this.drawType = "transfer";
      let self = this;
      this.amapProvider.drawTransfer(this.route, function (data) {
        self.reName(data)
      })
    }
  }

  //骑车线路规划
  drawRiding() {
    this.drawType = "riding";
    // this.amapProvider.drawDriving(this.route)
  }

  //步行线路规划
  drawWalking() {
    this.drawType = "walking";
    // this.amapProvider.drawDriving(this.route)
  }


  showRoute(policy) {
    console.log("<policy>",policy);
    switch (this.drawType) {
      case "driving":
        this.drawDriving(policy);
        break;
      case "transfer":
        this.drawTransfer();
        break;
      case "riding":
        break;
      case "walking":
        break;

    }
  }

  checkRouteEmpty() {
    if (this.route.start.city == "" || this.route.start.place == "" || this.route.end.city == "" || this.route.start.place == "") {
      this.apiProvider.alert("请完整填写起点和终点信息");
      return false
    } else
      return true
  }

  ionViewWillEnter() {
    this.loadMap(this.map_container.nativeElement, 'route');
  }

  ionViewDidLoad() {
  }

  ionViewWillLeave() {
    this.amapProvider.destroyMap('route')
  }
}
