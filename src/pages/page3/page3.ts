import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
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
    this.navCtrl.push(LoginPage);
  }
     showReceive()
  {
    this.navCtrl.push(Login2Page);
  }
  
  }
