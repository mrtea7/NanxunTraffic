import {Injectable} from '@angular/core';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';


/**
 * 高德地图.
 */
declare let AMap;


@Injectable()
export class AmapProvider {
  map: any;//地图对象
  mapName: string;//地图名字

  constructor(public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController ) {
  }

  initMap(ele, mapName) {
    if (this.mapName != mapName) {
      this.map = new AMap.Map(ele, {
        view: new AMap.View2D({//创建地图二维视口
          zoom: 11, //设置地图缩放级别
          rotateEnable: true,
          showBuildingBlock: true
        })
      });
      this.mapName = mapName;
      console.log(`${mapName} map init`);
      return this.map;
    }

  }
  clearMap(){
    this.map.clearMap();
  }
  drawDriving(item) {
    this.map.clearMap();
    let self = this;
    AMap.plugin('AMap.Driving',function(){
      let driving = new AMap.Driving({
        map:self.map
      });
      driving.search([
        {keyword:item.start,city:'杭州'},
        {keyword:item.end,city:'杭州'}
      ],function (status,result) {
        if(status == "error"){
          self.alert(result.info);
        }
        console.log("<status>",status);
        console.log("<result>",result);
      });
    })
  }
  //公交换乘
  drawTransfer(item) {
    this.map.clearMap();
    let self = this;
    AMap.plugin('AMap.Transfer',function(){
      let transfer = new AMap.Transfer({
        map:self.map
      });
      transfer.search([
        {keyword:item.start,city:'杭州'},
        {keyword:item.end,city:'杭州'}
      ],function (status,result) {
        if(status == "error"){
          self.alert(result.info);
        }
        console.log("<status>",status);
        console.log("<result>",result);
      });
    })
  }
  //点标注
  drawPoints(item) {
    this.clearMap();
    let self = this;
    let markers = [];
    let icon = new AMap.Icon({
      image: 'https://vdata.amap.com/icons/b18/1/2.png',
      size: new AMap.Size(24, 24)
    });
    for (let i = 0; i < item.length; i++) {
      let marker;
      marker = new AMap.Marker({
        icon: icon,
        position: item[i].center.split(','),
        title: item[i].name,
        map: self.map
      });
      markers.push(marker);
    }
    self.map.setFitView();

  }
  autoComplete(item){
    let self = this;
    AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
      let autoOptions = {
        city: "北京", //城市，默认全国
      };
     let autocomplete= new AMap.Autocomplete(autoOptions);
      let placeSearch = new AMap.PlaceSearch({
        city:'北京',
        map:self.map
      });
      AMap.event.addListener(autocomplete, "select", function(e){
        //TODO 针对选中的poi实现自己的功能
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name)
      });
    });
  }

  destroyMap(mapName) {
    if (this.mapName == mapName) {
      this.mapName = null;
      this.map.destroy();
      console.log(`${mapName} map destroy`);
    }
    else {
      console.log(`${mapName} map not init`);
      return
    }
  }

  //todo  toast和alert封装不能从ApiProvider中直接用
  toast(message, callback?) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      dismissOnPageChange: true,
    });
    toast.present();
    if (callback) {
      callback();
    }
  }
  alert(message, callback?) {
    if (callback) {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: message,
        buttons: [{
          text: "确定",
          handler: data => {
            callback();
          }
        }]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: message,
        buttons: ["确定"]
      });
      alert.present();
    }
  }
}
