import { Component } from '@angular/core';
import { Login1Page } from '../login1/login1';
import { Login2Page } from '../login2/login2';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html'
})
export class Page3 {

  constructor(public navCtrl: NavController) {
   
  }
  showDonate()
  {
    this.navCtrl.push(Login1Page);
  }
     showReceive()
  {
    this.navCtrl.push(Login2Page);
  }
  
  }
