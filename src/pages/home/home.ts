import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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
    {icon:'icon-xinxi1',name:'路况信息',component: 'TraInfoPage'}
  ];

  constructor(public navCtrl: NavController) {
    // used for an example of ngFor and navigation

  }

  ionViewDidLoad() {
  }

  openPage(menu) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(menu.component);
  }
}
