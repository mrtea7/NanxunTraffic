import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {ApiProvider,AppGlobal } from '../../providers/providers'
import {AmapProvider} from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'mapServer.html'
})
export class MapServerPage {
  @ViewChild('map_container') map_container: ElementRef;

  currentItems: any = [];
  points: any = [
    {
      "name": "一个点",
      "center": "120.155636,30.289238",
      "type": 0,
      "subDistricts": []
    },
    {
      "name": "er个点",
      "center": "120.138985,30.29235",
      "type": 0,
      "subDistricts": []
    },
    {
      "name": "3个点",
      "center": "120.12817,30.252322",
      "type": 0,
      "subDistricts": []
    },
    {
      "name": "4个点",
      "center": "120.160786,30.329547",
      "type": 0,
      "subDistricts": []
    }
  ];
  point: any = [
    {
      "name": "一个点",
      "center": "120.155636,30.289238",
      "type": 0,
      "subDistricts": []
    }
  ];

  constructor(public navCtrl: NavController, public amapProvider: AmapProvider, public apiProvider: ApiProvider) {
  }

  filterItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    } else if (val == "haha") {
      this.currentItems = [{name: "haha", about: "hahaabout", note: "nitamadechoushabi"}]
    } else if (val == "ha") {
      //todo ajax请求
      this.currentItems = [
        {name: "311路", about: "蒋村公交站-中泰（这个名字比较长）", note: "公交路线", type: "line", start: "蒋村公交站", end: "新西湖小镇"},
        {name: "公交站", about: "浙江省杭州市西湖区", note: "很多点", type: "points"},
        {name: "远眺科技有限公司", about: "余杭区文一西路1326号", note: "利尔达物联网科技园区", type: "point"}
      ]
    }else {
      this.getCategories()
    }
  }

  locate (){
    alert("点击了")
  }
  openItem(item) {
    switch (item.type) {
      case "line":
        this.amapProvider.drawTransfer(item,function () {});
        break;
      case "points":
        this.amapProvider.drawPoints(this.points);
        break;
      case "point":
        this.amapProvider.drawPoints(this.point);
        break;
      default:
        alert("查询不到该信息");
    }
    this.currentItems = [];
  }

  loadMap(ele, mapName) {
    this.amapProvider.initMap(ele, mapName);
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
  //获取分类
  getCategories() {
    this.apiProvider.httpGet(AppGlobal.API.getTest, { a: '杭州市' }, rs => {
      console.log(rs);

    })
  }

}
