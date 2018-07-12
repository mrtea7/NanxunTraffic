import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

import {ApiProvider, AppGlobal} from '../../providers/providers'
import {AmapProvider} from '../../providers/providers'

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'mapServer.html'
})
export class MapServerPage {
  @ViewChild('map_container') map_container: ElementRef;

  currentItems: any = [];
  taxiPoints:any = [
     /* {
        center: "120.409625,30.875215",
        plate: "浙ET3212",
        describe: [
          {
            info: "这是所属公司这是所属公司",
            time: "",
            location: ""
          }
        ]
      }*/
    ];
  bicyclePoints:any = [
    /*{
    center: "120.188483,30.713743",
    plate: "华芯花园",
    describe: [
      {
        info: "适园路，丽菁大酒店北门停车场路边",
        time: "",
        location: ""
      }
    ]
  }*/
    ];
  informationPoints:any = [
    {
    center: "120.419435,30.854119",
    plate: "万顺路朝阳路口虚拟情报板",
    describe: [
      {
        info: "万顺路朝阳路口交通拥挤，请绕行",
        time: "",
        location: ""
      }
    ]
  }, {
      center: "120.410744,30.856569",
      plate: "联新桥虚拟情报板",
      describe: [
        {
          info: "联新桥桥上施工，路段封闭",
          time: "",
          location: ""
        }
      ]
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
  info:object = {name:'',detail:''};
  pointFlag: boolean = false;

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
    } else {
      this.getCategories("",val)
    }
  }


  taxi() {
    let _this = this;
    this.info = {};
   this.getCategories("taxi",'');
    this.amapProvider.drawPoints(this.taxiPoints,'./assets/imgs/taxi-blue.png',function (data) {
      _this.pointFlag = true;
      _this.info= {name:data.plate,detail:data.describe[0].info};
    });
  }
  bicycle() {
    let _this = this;
    this.info = {};
    this.getCategories("bicycle",'');
    this.amapProvider.drawPoints(this.bicyclePoints,'./assets/imgs/bicycle-blue.png',function (data) {
      _this.pointFlag = true;
      _this.info= {name:data.plate,detail:data.describe[0].info};
    });
  }
  information() {
    let _this = this;
    this.info = {};
    // this.getCategories("information",'');
    this.amapProvider.drawPoints(this.informationPoints,'./assets/imgs/information-blue.png',function (data) {
      _this.pointFlag = true;
      _this.info= {name:data.plate,detail:data.describe[0].info};
    });
  }
  plan() {
    this.navCtrl.push('PlanPage')
  }

  construction() {
    this.navCtrl.push('ConstructionPage')
  }

  openItem(item) {
    switch (item.type) {
      case "line":
        this.amapProvider.drawTransfer(item, "", function () {
        });
        break;
      case "points":
        this.amapProvider.drawPoints(this.taxiPoints,'./assets/imgs/taxi-blue.png',function (data) {
          console.log("<data>",data);
        });
        break;
      case "point":
        this.amapProvider.drawPoints(this.point,'./assets/imgs/taxi-blue.png',function (data) {
          console.log("<data>",data);
        });
        break;
      default:
        alert("查询不到该信息");
    }
    this.currentItems = [];
  }

  loadMap(ele, mapName) {
    this.amapProvider.initMap(ele, mapName);
    this.taxi();
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
  getCategories(type,param) {
    //出租车
    if(type=='taxi'){
      this.apiProvider.httpGet(AppGlobal.API.getTaxi, {queryParam: param}, res => {
        if (res.flag == "true") {
          this.taxiPoints = res.data;
        }
        else {
          this.apiProvider.toast(res.message)
        }
      })
    }
    //自行车点位
    else if (type=='bicycle'){
      this.apiProvider.httpGet(AppGlobal.API.getBicycle, {queryParam: param}, res => {
        if (res.flag == "true") {
          this.bicyclePoints = res.data;
        }
        else {
          this.apiProvider.toast(res.message)
        }
      })
    }
    //虚拟情报板
    else if (type=='information') {
      this.apiProvider.httpGet(AppGlobal.API.getInformation, {queryParam: param}, res => {
        if (res.flag == "true") {
          this.informationPoints = res.data;
        }
        else {
          this.apiProvider.toast(res.message)
        }
      })
    }
  }


}
