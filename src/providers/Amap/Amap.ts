import {Injectable} from '@angular/core';

/**
 * 高德地图.
 */
declare let AMap;

@Injectable()
export class AmapProvider {
  map: any;//地图对象
  mapName: string;//地图名字

  constructor() {
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
  drawRoute() {

    let self = this;
    AMap.plugin('AMap.Driving',function(){
      var drving = new AMap.Driving({
        map:self.map
      });
      drving.search([
        {keyword:'宁波站',city:'宁波'},
        {keyword:'宁波栎社国际机场',city:'宁波'}
      ]);
    })
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
}
