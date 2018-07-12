import {Injectable} from '@angular/core';
import {LoadingController, AlertController, ToastController} from 'ionic-angular';


/**
 * 高德地图.
 */
declare let AMap;


@Injectable()
export class AmapProvider {
  map: any;//地图对象
  auto: any;
  mapName: string;//地图名字
  rootPath: string = "";
  infoWindow:any;

  constructor(public loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
  }

  initMap(ele, mapName) {
    if (this.mapName != mapName) {
      console.log("<Amap>", AMap);
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


  clearMap() {
    this.map.clearMap();
  }

  //驾车路线
  drawDriving(item, policy) {
    this.map.clearMap();
    let self = this;
    let drivingPolicy;
    if (policy) {
      switch (policy) {
        case "time":
          drivingPolicy = AMap.DrivingPolicy.LEAST_TIME;
          break;
        case "distance":
          drivingPolicy = AMap.DrivingPolicy.LEAST_DISTANCE;
          break;
        case "fee":
          drivingPolicy = AMap.DrivingPolicy.LEAST_FEE;
          break;
      }
    }

    AMap.plugin('AMap.Driving', function () {
      let driving = new AMap.Driving({
        map: self.map,
        policy: drivingPolicy || AMap.DrivingPolicy.LEAST_TIME
      });
      driving.search([
        {keyword: item.start.place, city: item.start.city},
        {keyword: item.end.place, city: item.end.city}
      ], function (status, result) {
        if (status == "error") {
          self.alert(result.info);
        }
        // console.log("<status>", status);
        // console.log("<result>", JSON.stringify(result));
      });
    })
  }

  //公交换乘
  drawTransfer(item, policy, callBack) {
    this.map.clearMap();
    let self = this;
    let drivingPolicy;
    if (policy) {
      switch (policy) {
        case "time":
          drivingPolicy = AMap.LEAST_TIME;
          break;
        case "distance":
          drivingPolicy = AMap.LEAST_WALK;
          break;
        case "fee":
          drivingPolicy = AMap.LEAST_FEE;
          break;
      }
    }
    AMap.plugin('AMap.Transfer', function () {
      let transfer = new AMap.Transfer({
        map: self.map,
        policy: drivingPolicy || AMap.LEAST_TIME
      });
      transfer.search([
        {keyword: item.start.place, city: item.start.city},
        {keyword: item.end.place, city: item.end.city}
      ], function (status, result) {
        if (status == "error") {
          self.alert(result.info);
        }
        if (callBack instanceof Function) {
          callBack(result);
        }
        // console.log("<status>",status);
        // console.log("<result>", result);
      });
    })
  }
  //在指定位置打开信息窗体

  //点标注
  drawPoints(item,imgUrl,callBack) {
    this.clearMap();
    let self = this;
    let markers = [];
    let icon = new AMap.Icon({
      image: imgUrl,//'./assets/imgs/taxi-blue.png'
      size: new AMap.Size(24, 24)
    });
    for (let i = 0; i < item.length; i++) {
      let marker;
      if(item[i].center){
        marker = new AMap.Marker({
          icon: icon,
          position: item[i].center.split(','),
          title: item[i].name,
          map: self.map
        });
        marker.on('click', function() {
          if (callBack instanceof Function) {
            callBack(item[i]);
          }
        });
        markers.push(marker);
      }
    }
    self.map.setFitView();
  }

  autoComplete() {
    let self = this;
    AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
      let autoOptions = {
        city: "", //城市，默认全国
        input: "route_start"
      };
      let autocomplete = new AMap.Autocomplete(autoOptions);
      let placeSearch = new AMap.PlaceSearch({
        map: self.map
      });
      AMap.event.addListener(autocomplete, "select", function (e) {
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
