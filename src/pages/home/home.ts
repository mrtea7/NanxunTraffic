import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menus:any[] =[
    {icon:'icon-ditu',name:'交通信息',component: 'MapServerPage' },
    {icon:'icon-shangban',name:'交通出行',component: 'PubTransPage' },
    {icon:'icon-dkw_qiche',name:'私家车服务',component: 'PriServerPage'},
    {icon:'icon-xinxi1',name:'信息服务',component: 'TraInfoPage'}
  ];

  constructor(public navCtrl: NavController,private geolocation: Geolocation) {
    // used for an example of ngFor and navigation
    this.getGPS();

  }
  public getGPS(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude,resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }
  ionViewDidLoad() {
  }

  openPage(menu) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(menu.component);
  }
}
